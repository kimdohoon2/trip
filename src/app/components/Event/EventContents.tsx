'use client';

import 'swiper/css';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { useEventData } from '@/app/hooks/useEventData';
import EventHeader from '@/app/components/Event/EventHeader';
import EventCalendar from '@/app/components/Event/EventCalendar';
import EventCard from '@/app/components/Event/EventCard';
import EventPagination from '@/app/components/Event/EventPagination';
import DataError from '@/app/components/Common/Error';
import EmptyState from '@/app/components/Common/EmptyState';
import EventSkeleton from '@/app/components/Event/EventSkeleton';
import Modal from '@/app/components/Common/Modal';
import { useModalLogic } from '@/app/hooks/useModalLogic';

export default function EventContents() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>('전국');
  const { isModalOpen, openModal, closeModal } = useModalLogic();

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const eventStartDate = currentDate
    ? `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`
    : '';

  const { data: eventData, isLoading, error, refetch } = useEventData(selectedArea, eventStartDate);

  useEffect(() => {
    if (currentDate && eventStartDate) {
      refetch();
      setActiveIndex(0);
      swiperRef?.slideTo(0);
    }
  }, [currentDate, selectedArea, refetch, swiperRef, eventStartDate]);

  if (!currentDate) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mt-8">
      <EventHeader selectedArea={selectedArea} onAreaChange={setSelectedArea} />

      <div className="relative w-full bg-black py-5 2xl:py-10">
        <EventCalendar
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onPrevDay={() =>
            setCurrentDate(new Date(new Date(currentDate).setDate(currentDate.getDate() - 1)))
          }
          onNextDay={() =>
            setCurrentDate(new Date(new Date(currentDate).setDate(currentDate.getDate() + 1)))
          }
        />
        {isLoading ? (
          <EventSkeleton />
        ) : error ? (
          <div className="mt-5 flex flex-col items-center gap-4">
            <DataError />
          </div>
        ) : eventData && eventData.length > 0 ? (
          <>
            <Swiper
              className="mt-5 w-full cursor-pointer 2xl:mt-10"
              slidesPerView={1.5}
              breakpoints={{
                1920: {
                  slidesPerView: 2.5,
                },
              }}
              centeredSlides={true}
              onSwiper={setSwiperRef}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {eventData.map((event) => (
                <SwiperSlide
                  className="mr-4 !w-[65%] lg:!w-[45%] 2xl:!w-[50rem]"
                  key={event.contentid}
                >
                  <EventCard event={event} onClick={openModal} />
                </SwiperSlide>
              ))}
            </Swiper>
            <EventPagination
              eventData={eventData}
              activeIndex={activeIndex}
              onPaginationClick={(pagination) => swiperRef?.slideTo(pagination)}
            />
          </>
        ) : (
          <div className="text-center">
            <EmptyState type="date" mainClassName="text-white" subClassName="text-white" />
          </div>
        )}
      </div>
      {isModalOpen && <Modal onClose={closeModal} />}
    </section>
  );
}

'use client';

import Image from 'next/image';
import 'swiper/css';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCircleRight } from '@fortawesome/free-regular-svg-icons';
import formatDate from '@/app/utils/formatDate';
import CustomCalendar from '@/app/components/Calendar/CustomCalendar';

interface EventSlideType {
  firstimage: string;
  title: string;
  addr1: string;
  eventstartdate: string;
  eventenddate: string;
  tel: string;
}

export const EventSlideInfo: EventSlideType[] = [
  {
    firstimage: '/main/main1.png',
    title: '가볼래-터 도착❄',
    addr1: '서울특별시 송파구',
    eventstartdate: '20240510',
    eventenddate: '20240512',
    tel: '055-940-3425',
  },
  {
    firstimage: '/main/main2.png',
    title: '자연 그대로의 매력🌲',
    addr1: '서울특별시 송파구',
    eventstartdate: '20240510',
    eventenddate: '20240512',
    tel: '055-940-3425',
  },
  {
    firstimage: '/main/main3.png',
    title: ' 한옥 스테이와 함께,',
    addr1: '서울특별시 송파구',
    eventstartdate: '20240510',
    eventenddate: '20240512',
    tel: '055-940-3425',
  },
];

export default function EventContents() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePaginationClick = (pagination: number) => {
    if (swiperRef) {
      swiperRef.slideTo(pagination);
    }
  };
  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };
  return (
    <section className="mt-8">
      <div className="mb-5 flex items-center justify-center gap-2">
        <div className="w-9 lg:w-11">
          <Image
            className="w-full"
            src="/icons/event1.png"
            alt="행사 아이콘"
            width={512}
            height={512}
          ></Image>
        </div>
        <h3 className="text-center text-lg">
          <strong>전국</strong> 축제·행사 어디까지 가봤니?
        </h3>
      </div>
      <div className="relative w-full bg-black py-5">
        {/* 해드 */}
        <div className="flex w-full justify-center gap-8">
          <div className="text-md cursor-pointer text-white" onClick={handlePrevDay}>
            <FontAwesomeIcon icon={faCircleLeft} />
          </div>
          <CustomCalendar selectedDate={currentDate} onDateChange={setCurrentDate} />
          <div className="text-md cursor-pointer text-white" onClick={handleNextDay}>
            <FontAwesomeIcon icon={faCircleRight} />
          </div>
        </div>
        {/* 행사 컨텐츠 */}
        <Swiper
          className="mt-5 w-full"
          slidesPerView={1.5}
          centeredSlides={true}
          onSwiper={setSwiperRef}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {EventSlideInfo.map((event, index) => (
            <SwiperSlide className="mr-4 !w-[65%]" key={index}>
              <div className="event-card relative w-full rounded-md bg-white p-5">
                <div className="w-full">
                  <Image
                    className="w-full"
                    src={event.firstimage}
                    alt={event.title}
                    width={512}
                    height={512}
                  />
                </div>
                <div className="border-b border-dashed pb-4 text-center">
                  <div className="my-3">
                    <h3 className="text-md">{event.title}</h3>
                    <p className="text-xs text-gray6">{event.addr1}</p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <span className="text-xs text-gray6">{formatDate(event.eventstartdate)}</span>
                    <span className="text-xs text-gray6">~</span>
                    <span className="text-xs text-gray6">{formatDate(event.eventenddate)}</span>
                  </div>
                  <a className="text-xs text-gray6" href={`tel:${event.tel}`} target="_parent">
                    tel: {event.tel}
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-4 flex justify-center">
          {EventSlideInfo.map((_, pagination) => (
            <div
              key={pagination}
              className={`mx-1 h-2 cursor-pointer rounded-full border border-white ${
                pagination === activeIndex ? 'w-5 bg-white' : 'bg-gray-400 w-2'
              }`}
              onClick={() => handlePaginationClick(pagination)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

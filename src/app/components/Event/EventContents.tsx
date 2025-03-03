'use client';

import Image from 'next/image';
import 'swiper/css';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCircleRight } from '@fortawesome/free-regular-svg-icons';
import formatDate from '@/app/utils/formatDate';
import CustomCalendar from '@/app/components/Calendar/CustomCalendar';
import { useEventData } from '@/app/hooks/useEventData';
import { AreaHeaderSlide } from '@/app/constant/SlideConstant';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';
import Link from 'next/link';

export default function EventContents() {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedArea, setSelectedArea] = useState<string>('전국');

  const eventStartDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;

  const { data: eventData, isLoading, error, refetch } = useEventData(selectedArea, eventStartDate);

  useEffect(() => {
    refetch();
    setActiveIndex(0);
    swiperRef?.slideTo(0);
  }, [currentDate, selectedArea, refetch, swiperRef]);

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
          />
        </div>
        <h3 className="text-center text-lg">
          <button>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="cursor-pointer bg-transparent"
            >
              {AreaHeaderSlide.map((area) => (
                <option key={area.title}>{area.title}</option>
              ))}
            </select>
          </button>{' '}
          축제·행사 어디까지 가봤니?
        </h3>
      </div>
      <div className="relative w-full bg-black py-5 2xl:py-10">
        {/* 헤더 */}
        <div className="flex w-full items-center justify-center gap-8">
          <div className="text-md cursor-pointer text-white 2xl:text-lg" onClick={handlePrevDay}>
            <FontAwesomeIcon icon={faCircleLeft} />
          </div>
          <CustomCalendar selectedDate={currentDate} onDateChange={setCurrentDate} />
          <div className="text-md cursor-pointer text-white 2xl:text-lg" onClick={handleNextDay}>
            <FontAwesomeIcon icon={faCircleRight} />
          </div>
        </div>
        {/* 행사 컨텐츠 */}
        {isLoading ? (
          <div className="text-center text-white">로딩 중...</div>
        ) : error ? (
          <div className="text-center text-white">에러 발생: {error.message}</div>
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
                  className="mr-4 !w-[65%] lg:!w-[45%] 2xl:!w-[800px]"
                  key={event.contentid}
                >
                  <div className="event-card relative w-full rounded-md bg-white p-5">
                    <div className="2xl:flex">
                      <div className="relative h-[200px] w-full lg:h-72 2xl:w-[200px]">
                        <Image
                          className="absolute h-full w-full rounded-lg object-contain 2xl:object-cover"
                          src={event.firstimage || '/placeholder-image.jpg'}
                          alt={event.title}
                          width={512}
                          height={512}
                        />
                      </div>
                      <div className="border-dashed text-center 2xl:ml-8 2xl:flex 2xl:flex-col 2xl:justify-between 2xl:border-l 2xl:pb-0 2xl:pl-8 2xl:text-left">
                        <div className="my-3">
                          <h3 className="text-md lg:text-2xl">{filterTitle(event.title)}</h3>
                          <p className="text-xs text-gray6 lg:text-base">
                            {filterAddress(event.addr1)}
                          </p>
                        </div>
                        <div className="border-b border-dashed pb-4 lg:mt-10 lg:flex lg:justify-around lg:gap-10 2xl:border-b-0">
                          <div>
                            <p className="hidden lg:block">기간</p>
                            <div className="flex justify-center gap-3 lg:justify-start">
                              <span className="text-xs text-gray6 2xl:text-sm">
                                {formatDate(event.eventstartdate)}
                              </span>
                              <span className="text-xs text-gray6 2xl:text-sm">~</span>
                              <span className="text-xs text-gray6 2xl:text-sm">
                                {formatDate(event.eventenddate)}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="hidden lg:block">장소</p>
                            <p className="hidden lg:block lg:text-xs 2xl:text-sm">{event.addr1}</p>
                          </div>
                        </div>
                        <div className="mt-4 lg:mb-4 lg:mt-7">
                          <Link
                            className="hover-button rounded-xl border border-bordercolor px-6 py-1 text-sm lg:text-base"
                            href={createKakaoMapURL(event.addr1)}
                            target="_blank"
                          >
                            길찾기
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-4 flex justify-center">
              {eventData.map((_, pagination) => (
                <div
                  key={pagination}
                  className={`mx-1 h-2 cursor-pointer rounded-full border border-white ${
                    pagination === activeIndex ? 'w-5 bg-white' : 'bg-gray-400 w-2'
                  }`}
                  onClick={() => handlePaginationClick(pagination)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-white">해당 날짜에 이벤트가 없습니다.</div>
        )}
      </div>
    </section>
  );
}

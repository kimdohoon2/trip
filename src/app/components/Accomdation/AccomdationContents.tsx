'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { AreaHeaderSlide } from '@/app/constant/SlideConstant';
import { useStayData } from '@/app/hooks/useStayData';
import { useInteractionStore } from '@/app/stores/useInteractionStore';
import ProgressBar from '@/app/components/Common/ProgressBar';
import MoreButton from '@/app/components/Common/MoreButton';
import Spinner from '@/app/components/Common/Spinner';
import DataError from '@/app/components/Common/Error';
import AreaEmptyState from '@/app/components/Common/AreaEmptyState';
import { StayItem } from '@/app/types/ItemType';

export default function AccomdationContents() {
  const { setCurrentPage } = useInteractionStore();
  const [selectedArea, setSelectedArea] = useState<string>('전국');
  const [buttonStates, setButtonStates] = useState<{ [key: string]: boolean }>({ 전국: true });

  const { data: stayData, isLoading, error } = useStayData(selectedArea);

  const [processedStayData, setProcessedStayData] = useState<StayItem[]>([]);

  useEffect(() => {
    if (stayData) {
      const processed = stayData.map((stay) => ({
        ...stay,
        addr1: stay.addr1.split(' ').slice(0, 2).join(' '), // 주소의 첫 두 부분만 사용
        title: stay.title.length > 12 ? stay.title.slice(0, 12) + '...' : stay.title, // 12자로 제한
      }));
      setProcessedStayData(processed);
    }
  }, [stayData]);

  useEffect(() => {
    setButtonStates({ [selectedArea]: true });
  }, [selectedArea]);

  const handleLocationClick = (title: string) => {
    setSelectedArea(title);
    setButtonStates({ [title]: true });
  };

  return (
    <section className="mt-6 1xl:mx-auto 1xl:max-w-[1000px]">
      <div className="px-4 lg:px-6">
        {/* 아이콘 & 제목 */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-9 lg:w-11">
            <Image
              className="w-full"
              src="/icons/hotel2.png"
              alt="숙박아이콘"
              width={512}
              height={512}
            />
          </div>
          <h1 className="text-primary text-lg font-bold lg:text-2xl">한국관광공사 추천 숙박시설</h1>
        </div>
      </div>

      {/* 추천 기준 설명 */}
      <div className="border-gray-200 mx-4 mt-4 rounded-lg border bg-white p-4 shadow-md">
        <p className="text-center text-sm lg:text-lg">
          본 숙박시설은 한국관광공사의 인증을 받은
          <br /> <span className="text-primary font-bold">&quot;베니키아&quot;</span>,{' '}
          <span className="text-primary font-bold">&quot;굿스테이&quot;</span> 숙소들로, 신뢰할 수
          있는 품질과 편안한 환경을 제공합니다.
        </p>
      </div>

      {/* 지역 선택 UI */}
      <div className="mt-6 pl-4 lg:px-6">
        <Swiper slidesPerView="auto" spaceBetween={10} wrapperTag="ul">
          {AreaHeaderSlide.map((slide, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handleLocationClick(slide.title)}
              className={`!w-auto cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all ${
                buttonStates[slide.title]
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-600 border-gray-200 hover:bg-gray-100 border bg-white'
              }`}
            >
              {slide.title}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 숙박 데이터 표시 */}
      <div className="my-6 px-4 lg:px-6">
        {isLoading && (
          <div className="mt-6">
            <Spinner />
            <p className="text-center">잠시만 기다려 주세요.</p>
          </div>
        )}
        {error && (
          <div className="mt-7 flex flex-col items-center gap-3">
            <DataError />
          </div>
        )}
        {!isLoading && !error && (!stayData || stayData.length === 0) && <AreaEmptyState />}
        {!isLoading && !error && stayData && stayData.length > 0 && (
          <>
            <Swiper
              className="cursor-pointer !pb-3 lg:!pb-5 1xl:!pb-7"
              slidesPerView={1.2}
              spaceBetween={20}
              centeredSlides={true}
              loop={processedStayData.length > 4}
              onSlideChange={(swiper) => setCurrentPage(swiper.realIndex + 1)}
              breakpoints={{
                1024: { slidesPerView: 4 },
              }}
            >
              {processedStayData.map((stay) => (
                <SwiperSlide key={stay.contentid}>
                  <div className="rounded-lg bg-white shadow-md">
                    <div className="relative aspect-[4/3]">
                      <Image
                        className="h-full w-full"
                        src={stay.firstimage || '/error/no-image.png'}
                        alt={stay.title}
                        width={500}
                        height={333}
                        priority
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-primary mb-2 text-lg font-bold">{stay.title}</h2>
                      <p className="text-gray-600 text-sm">
                        {' '}
                        {stay.addr1 || '주소를 준비중입니다.'}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <ProgressBar totalPages={stayData.length} />
          </>
        )}
      </div>
      <MoreButton href="/" text="더많은" strongText="숙박시설" />
    </section>
  );
}

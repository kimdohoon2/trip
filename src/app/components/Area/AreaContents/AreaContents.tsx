'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import Spinner from '@/app/components/Common/Spinner';
import Toast from '@/app/components/Common/Toast';
import CategorySelector from '@/app/components/Area/AreaContents/CategorySelector';
import ProgressBar from '@/app/components/Common/ProgressBar';
import MoreButton from '@/app/components/Common/MoreButton';
import DataError from '@/app/components/Common/Error';
import AreaEmptyState from '@/app/components/Common/AreaEmptyState';
import AreaSlideProps from '@/app/components/Area/AreaContents/AreaSlideProps';
import { useAreaContentsLogic } from '@/app/hooks/useAreaContentsLogic';

export default function AreaContents() {
  const {
    filteredData,
    availableCategories,
    regionText,
    totalPages,
    handleSlideChange,
    generateKey,
    isLoading,
    error,
  } = useAreaContentsLogic();

  // 로딩 중일 때 표시할 UI
  if (isLoading) {
    return (
      <div className="mt-32">
        <Spinner />
        <p className="text-center">잠시만 기다려 주세요.</p>
      </div>
    );
  }

  // 에러 발생 시 표시할 UI
  if (error) {
    return (
      <div className="mt-7 flex flex-col items-center gap-3">
        <DataError />
      </div>
    );
  }

  return (
    <>
      <Toast />
      <section className="relative -top-5 rounded-tl-[20px] bg-white pb-10 pl-4 pt-5 lg:-top-0 lg:px-6 lg:pb-12 lg:pt-12 1xl:m-auto 1xl:max-w-[1000px] 1xl:pl-0 1xl:pr-0">
        <h2 className="text-lg lg:text-2xl">{regionText}</h2>
        <CategorySelector availableCategories={availableCategories} />

        {filteredData.length === 0 ? (
          <AreaEmptyState />
        ) : (
          <>
            <Swiper
              slidesPerView={2.5}
              grid={{ rows: 2 }}
              breakpoints={{
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 4 },
              }}
              modules={[Grid]}
              onSlideChange={handleSlideChange} // 슬라이드 변경 시 처리
              className="mt-[20px] h-full w-full lg:mt-[50px]"
            >
              {filteredData.map((item) => (
                <SwiperSlide
                  key={generateKey(item)} // 고유 키를 이용해 슬라이드 생성
                  className="flex w-full max-w-[300px] flex-row items-center justify-center pb-[15px] pr-[15px] lg:pb-[30px]"
                >
                  <AreaSlideProps item={item} /> {/* 슬라이드 아이템 */}
                </SwiperSlide>
              ))}
            </Swiper>
            <ProgressBar className="lg:hidden" totalPages={totalPages} /> {/* 진행 상태 바 */}
            <MoreButton href="/morepage" text="더맣은" strongText="여행지" /> {/* 더 보기 버튼 */}
          </>
        )}
      </section>
    </>
  );
}

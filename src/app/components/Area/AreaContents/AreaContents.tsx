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
import EmptyState from '@/app/components/Common/EmptyState';
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
        {isLoading ? (
          <div className="relative h-[400px] md:h-[670px]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <Spinner />
              <p>잠시만 기다려 주세요 :)</p>
            </div>
          </div>
        ) : filteredData.length === 0 ? (
          <EmptyState />
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
              onSlideChange={handleSlideChange}
              className="mt-[20px] h-full w-full lg:mt-[50px]"
            >
              {filteredData.map((item) => (
                <SwiperSlide
                  key={generateKey(item)}
                  className="flex w-full max-w-[300px] flex-row items-center justify-center pb-[15px] pr-[15px] lg:pb-[30px]"
                >
                  <AreaSlideProps item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
            <ProgressBar className="lg:hidden" totalPages={totalPages} />
          </>
        )}
        <MoreButton className="mt-4" href="/morepage" text="더많은" strongText="여행지" />
      </section>
    </>
  );
}

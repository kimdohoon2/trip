import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { MainSlideInfo } from '@/app/constant/SlideConstant';

interface MainTextSliderProps {
  setGalleryTextSwiper: (swiper: SwiperType) => void;
}

const MainTextSlider: React.FC<MainTextSliderProps> = ({ setGalleryTextSwiper }) => {
  return (
    <Swiper
      className="galleryText h-full w-full"
      slidesPerView={1}
      breakpoints={{
        1920: {
          slidesPerView: 1.1,
          spaceBetween: 25,
        },
      }}
      loop={true}
      onSwiper={(swiper) => {
        setGalleryTextSwiper(swiper);
      }}
      modules={[Controller]}
    >
      {MainSlideInfo.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="relative flex h-full w-full items-center justify-center text-white"
        >
          <div className="inline-block h-full w-full translate-x-6 transform">
            <em className="h-5 rounded-bl-none rounded-br-lg rounded-tl-lg rounded-tr-lg bg-black px-2 py-1 text-xs leading-5 text-white xl:text-lg 2xl:rounded-tl-2xl">
              {slide.title}
            </em>
            <p className="mt-3 line-clamp-2 max-h-12 text-xl leading-6 tracking-tight text-black lg:text-[1.625rem] lg:leading-10 xl:mt-4 xl:max-h-20 xl:text-[2.3125rem] 2xl:mt-10 2xl:max-h-28 2xl:text-[2.75rem] 2xl:leading-[3.125rem]">
              {slide.description}
              {slide.description2 && (
                <>
                  <br />
                  {slide.description2}
                </>
              )}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainTextSlider;

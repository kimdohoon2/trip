import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Autoplay, Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { MainSlideInfo } from '@/app/constant/SlideConstant';

interface MainImageSliderProps {
  setGalleryTopSwiper: (swiper: SwiperType) => void;
  galleryTextSwiper: SwiperType | null;
  setCurrentSlide: (slide: number) => void;
  showNavigation: boolean;
}

const MainImageSlider: React.FC<MainImageSliderProps> = ({
  setGalleryTopSwiper,
  galleryTextSwiper,
  setCurrentSlide,
  showNavigation,
}) => {
  return (
    <>
      <Swiper
        className="galleryTop h-full w-full"
        slidesPerView={1} // 화면에 슬라이드 1개만 표시
        breakpoints={{
          1920: {
            slidesPerView: 1.1,
            spaceBetween: 25,
          },
        }}
        loop={true}
        navigation={{
          enabled: showNavigation,
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        controller={{ control: galleryTextSwiper || undefined }} // GalleryTextSwiper와 연동
        onSwiper={(swiper) => {
          setGalleryTopSwiper(swiper);
        }}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex + 1); // 슬라이드 변경 시 현재 슬라이드 업데이트
        }}
        modules={[Controller, Autoplay, Navigation]}
        speed={700}
        effect="slide"
        grabCursor={true}
      >
        {MainSlideInfo.map((slide, index) => (
          <SwiperSlide key={index} className="h-full w-full">
            <div className="relative h-full w-full">
              <Image
                className="rounded-bl-[0.3125rem] rounded-tl-[0.3125rem] object-cover lg:rounded-[0.3125rem]"
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 52.5rem, 52.5rem"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="lg:transform-origin-center hidden h-auto w-full lg:absolute lg:left-[-8%] lg:top-[-10%] lg:z-20 lg:block lg:max-w-[125px] lg:animate-rotate_image xl:left-[-6%] 2xl:left-[-4%] 2xl:top-[-8%]">
        <img
          className="object-contain"
          src="/icons/main_showcase_logo.png"
          alt="써클로고"
          width={125}
          height={128}
        />
      </div>
    </>
  );
};

export default MainImageSlider;

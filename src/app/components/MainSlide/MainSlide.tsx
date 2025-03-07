'use client';

import 'swiper/css';
import { useMainSlideLogic } from '@/app/hooks/useMainSlideLogic';
import MainImageSlider from '@/app/components/MainSlide/MainImageSlider';
import MainTextSlider from '@/app/components/MainSlide/MainTextSlider';
import MainProgress from '@/app/components/MainSlide/MainProgress';
import MainSlideCounter from '@/app/components/MainSlide/MainSlideCounter';
import MainSlideControls from '@/app/components/MainSlide/MainSlideControls';

const MainSlide: React.FC = () => {
  const {
    progressBarRef,
    setGalleryTopSwiper,
    galleryTextSwiper,
    setGalleryTextSwiper,
    currentSlide,
    setCurrentSlide,
    handlePlayPause,
    bgColor,
    showNavigation,
    isPlaying,
  } = useMainSlideLogic();

  return (
    <div
      className={`relative w-full ${bgColor} after-example transition-colors duration-1000 ease-in-out`}
    >
      <div className="clearfix relative lg:pb-[80px] lg:pt-[140px]">
        <div className="z-5 relative float-right h-[300px] w-full pl-[15px] pt-[20px] md:h-[570px] lg:h-[350px] lg:max-w-[453px] xl:h-[460px] xl:max-w-[678px] 2xl:h-[570px] 2xl:max-w-[1027px]">
          {/* 이미지 슬라이드 */}
          <MainImageSlider
            setGalleryTopSwiper={setGalleryTopSwiper}
            galleryTextSwiper={galleryTextSwiper}
            setCurrentSlide={setCurrentSlide}
            showNavigation={showNavigation}
          />
        </div>
        <div className="relative top-[-15px] w-auto lg:absolute lg:left-[0%] lg:top-1/2 lg:w-[507px] xl:left-[16%] xl:top-[40%] 2xl:left-[20%] 2xl:top-[30%]">
          {/* 텍스트 슬라이드 */}
          <MainTextSlider setGalleryTextSwiper={setGalleryTextSwiper} />
        </div>
        <div className="relative z-10 mx-auto flex w-[315px] items-center justify-between gap-[10px] px-1 md:w-[700px] lg:absolute lg:bottom-[110px] lg:left-5 lg:w-[370px] lg:gap-0 xl:left-[17%] 2xl:left-[21%]">
          {/* 프로그레스 바 */}
          <MainProgress progressBarRef={progressBarRef} />
          {/* 슬라이드 번호 표시 */}
          <MainSlideCounter currentSlide={currentSlide} />
          <MainSlideControls
            showNavigation={showNavigation}
            isPlaying={isPlaying}
            handlePlayPause={handlePlayPause}
          />
        </div>
      </div>
    </div>
  );
};

export default MainSlide;

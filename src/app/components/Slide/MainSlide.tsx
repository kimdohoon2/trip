'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Autoplay, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MainSlideInfo } from '@/app/constant/SlideConstant';
import { useMainSlideStore } from '@/app/stores/useMainSlideStore';

const MainSlide: React.FC = () => {
  const progressBarRef = useRef<HTMLDivElement | null>(null); // 로컬 useRef로 관리
  const topSwiperRef = useRef<SwiperType | null>(null);
  const textSwiperRef = useRef<SwiperType | null>(null);
  const {
    galleryTopSwiper,
    setGalleryTopSwiper,
    galleryTextSwiper,
    setGalleryTextSwiper,
    isPlaying,
    setIsPlaying,
    currentSlide,
    setCurrentSlide,
    bgColor,
    setBgColor,
    showNavigation,
    setShowNavigation,
  } = useMainSlideStore();

  useEffect(() => {
    const topSwiper = topSwiperRef.current;
    const textSwiper = textSwiperRef.current;

    if (topSwiper && textSwiper) {
      topSwiper.controller.control = textSwiper;
      textSwiper.controller.control = topSwiper;
    }
  }, []);

  const handlePlayPause = () => {
    if (galleryTopSwiper && galleryTopSwiper.autoplay) {
      if (isPlaying) {
        galleryTopSwiper.autoplay.stop();
        if (progressBarRef.current) {
          progressBarRef.current.style.animationPlayState = 'paused';
        }
      } else {
        galleryTopSwiper.autoplay.start();
        if (progressBarRef.current) {
          progressBarRef.current.style.animationPlayState = 'running';
        }
      }
      setIsPlaying(!isPlaying); // 슬라이드 재생 상태 토글
    } else {
      console.error('Swiper instance or autoplay is not available.');
    }
  };

  useEffect(() => {
    if (progressBarRef.current) {
      const progressBar = progressBarRef.current;
      progressBar.classList.remove('animate-progress');
      void progressBar.offsetWidth;
      progressBar.classList.add('animate-progress');
    }
  }, [currentSlide]);

  useEffect(() => {
    if (currentSlide === 1) {
      setBgColor('bg-custompink');
    } else if (currentSlide === 2) {
      setBgColor('bg-customyellow');
    } else if (currentSlide === 3) {
      setBgColor('bg-customskyblue');
    }
  }, [currentSlide]);

  useEffect(() => {
    function handleResize() {
      setShowNavigation(window.innerWidth >= 1024);
    }

    handleResize(); // 초기 로드 시 실행
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`relative w-full ${bgColor} after-example transition-colors duration-1000 ease-in-out`}
    >
      <div className="clearfix relative lg:pb-[80px] lg:pt-[140px]">
        <div className="z-5 relative float-right h-[300px] w-full pl-[15px] pt-[20px] md:h-[570px] lg:h-[350px] lg:max-w-[453px] xl:h-[460px] xl:max-w-[678px] 2xl:h-[570px] 2xl:max-w-[1027px]">
          {/* 이미지 슬라이드 */}
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
                    className="rounded-bl-[5px] rounded-tl-[5px] object-cover lg:rounded-[5px]"
                    src={slide.image}
                    alt={slide.title}
                    fill
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="lg:transform-origin-center hidden h-auto w-full lg:absolute lg:left-[-8%] lg:top-[-10%] lg:z-20 lg:block lg:max-w-[125px] lg:animate-rotate_image xl:left-[-6%] 2xl:left-[-4%] 2xl:top-[-8%]">
            <Image
              className="object-contain"
              src="/icons/main_showcase_logo.png"
              alt="써클로고"
              width={125}
              height={128}
            />
          </div>
        </div>
        <div className="relative top-[-15px] w-auto lg:absolute lg:left-[0%] lg:top-1/2 lg:w-[507px] xl:left-[16%] xl:top-[40%] 2xl:left-[20%] 2xl:top-[30%]">
          {/* 텍스트 슬라이드 */}
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
                  <p className="mt-3 line-clamp-2 max-h-12 text-xl leading-6 tracking-tight text-black lg:text-[26px] lg:leading-10 xl:mt-4 xl:max-h-20 xl:text-[37px] 2xl:mt-10 2xl:max-h-28 2xl:text-[44px] 2xl:leading-[50px]">
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
        </div>
        <div className="relative z-10 mx-auto flex w-[315px] items-center justify-between gap-[10px] px-1 md:w-[700px] lg:absolute lg:bottom-[110px] lg:left-5 lg:w-[370px] lg:gap-0 xl:left-[17%] 2xl:left-[21%]">
          <div className="h-[2px] w-full max-w-[225px] bg-gray md:max-w-none">
            {/* 프로그레스 바 */}
            <div
              ref={progressBarRef}
              className="z-12 relative h-[2px] w-full origin-left scale-x-0 transform bg-black"
            ></div>
          </div>
          <div className="ml-[25px] flex items-center gap-1 lg:ml-[20px] lg:mr-[60px]">
            {/* 슬라이드 번호 표시 */}
            <span className="text-[11px] font-bold text-black lg:text-base">
              {String(currentSlide).padStart(2, '0')}
            </span>
            <span className="text-[11px] text-black lg:text-base">/</span>
            <span className="text-[11px] text-black lg:text-base">
              {String(MainSlideInfo.length).padStart(2, '0')}
            </span>
          </div>
          <div className="lg:flex lg:w-[200px] lg:items-center lg:justify-between">
            {/* 재생/정지 버튼 */}
            {showNavigation && (
              <>
                <div className="swiper-button-prev cursor-pointer text-[18px]">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
              </>
            )}
            <div
              className="relative h-auto w-full max-w-[9px] -translate-y-[2px] transform cursor-pointer lg:max-w-[15px]"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Image
                  className="opacity-1 pointer-events-all object-cover"
                  src="/icons/btn_slidem_m_stop02.png"
                  alt="정지"
                  width={18}
                  height={22}
                />
              ) : (
                <Image
                  className="opacity-1 pointer-events-all object-cover"
                  src="/icons/btn_slide_m_play02.png"
                  alt="재생"
                  width={18}
                  height={22}
                />
              )}
            </div>
            {showNavigation && (
              <>
                <div className="swiper-button-next cursor-pointer text-[18px]">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSlide;

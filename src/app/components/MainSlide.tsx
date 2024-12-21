"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Swiper as SwiperClass } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const MainSlide: React.FC = () => {
  const slides = [
    {
      image: "/main/main1.png",
      title: "가볼래-터 도착❄",
      description: "낭만여행 적립",
      description2: "겨울 여행지 속으로",
    },
    {
      image: "/main/main2.png",
      title: "자연 그대로의 매력🌲",
      description: "강원도 양구 감성 충전 코스.zip",
    },
    {
      image: "/main/main3.png",
      title: " 한옥 스테이와 함께,",
      description: "논산에서 만나는 여유와 쉼",
    },
  ];

  const [galleryTopSwiper, setGalleryTopSwiper] = useState<SwiperClass | null>(
    null
  );
  const [galleryTextSwiper, setGalleryTextSwiper] =
    useState<SwiperClass | null>(null);

  const [isPlaying, setIsPlaying] = useState(true); // 슬라이드 재생 상태
  const [currentSlide, setCurrentSlide] = useState(1); // 현재 슬라이드 인덱스
  const progressBarRef = useRef<HTMLDivElement | null>(null); // 프로그레스 바 Ref 추가
  const [bgColor, setBgColor] = useState("bg-custompink");
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    if (galleryTopSwiper && galleryTextSwiper) {
      galleryTopSwiper.controller.control = galleryTextSwiper;
      galleryTextSwiper.controller.control = galleryTopSwiper;
    }
  }, [galleryTopSwiper, galleryTextSwiper]);

  const handlePlayPause = () => {
    if (galleryTopSwiper && galleryTopSwiper.autoplay) {
      if (isPlaying) {
        galleryTopSwiper.autoplay.stop();
        if (progressBarRef.current) {
          progressBarRef.current.style.animationPlayState = "paused";
        }
      } else {
        galleryTopSwiper.autoplay.start();
        if (progressBarRef.current) {
          progressBarRef.current.style.animationPlayState = "running";
        }
      }
      setIsPlaying(!isPlaying); // 슬라이드 재생 상태 토글
    } else {
      console.error("Swiper instance or autoplay is not available.");
    }
  };

  useEffect(() => {
    if (progressBarRef.current) {
      const progressBar = progressBarRef.current;
      progressBar.classList.remove("animate-progress");
      void progressBar.offsetWidth;
      progressBar.classList.add("animate-progress");
    }
  }, [currentSlide]);

  useEffect(() => {
    if (currentSlide === 1) {
      setBgColor("bg-custompink");
    } else if (currentSlide === 2) {
      setBgColor("bg-customyellow");
    } else if (currentSlide === 3) {
      setBgColor("bg-customskyblue");
    }
  }, [currentSlide]);

  useEffect(() => {
    function handleResize() {
      setShowNavigation(window.innerWidth >= 1024);
    }

    handleResize(); // 초기 로드 시 실행
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`relative w-full ${bgColor} after-example transition-colors duration-1000 ease-in-out`}
    >
      <div className="lg:pt-[140px] lg:pb-[80px] relative clearfix">
        <div className="pl-[15px] pt-[20px] z-5 w-full lg:max-w-[453px] lg:h-[350px] 2xl:max-w-[1027px] h-[300px] md:h-[570px] xl:max-w-[678px] xl:h-[460px] 2xl:h-[570px] float-right relative">
          {/* 이미지 슬라이드 */}
          <Swiper
            className="galleryTop w-full h-full"
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
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
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
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="w-full h-full">
                <div className="relative w-full h-full">
                  <Image
                    className="rounded-tl-[5px] rounded-bl-[5px] lg:rounded-[5px] object-cover"
                    src={slide.image}
                    alt={slide.title}
                    fill
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="hidden w-full h-auto lg:block lg:max-w-[125px] lg:absolute lg:top-[-10%] lg:z-20 lg:left-[-8%] 2xl:top-[-8%] lg:animate-rotate_image lg:transform-origin-center xl:left-[-6%] 2xl:left-[-4%]">
            <Image
              className="object-contain"
              src="/icons/main_showcase_logo.png"
              alt="써클로고"
              width={125}
              height={128}
            />
          </div>
        </div>
        <div className="w-auto relative lg:absolute top-[-15px] lg:top-1/2 xl:top-[40%] 2xl:top-[30%] lg:left-[0%] xl:left-[16%] 2xl:left-[20%] lg:w-[507px]">
          {/* 텍스트 슬라이드 */}
          <Swiper
            className="galleryText w-full h-full "
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
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                className="relative w-full h-full flex justify-center items-center text-white"
              >
                <div className="w-full h-full inline-block transform translate-x-6">
                  <em className="py-1 px-2 h-5 leading-5 rounded-tl-lg 2xl:rounded-tl-2xl rounded-tr-lg rounded-br-lg rounded-bl-none text-xs text-white bg-black xl:text-lg">
                    {slide.title}
                  </em>
                  <p className="mt-3 xl:mt-4 2xl:mt-10 text-[20px] leading-6 lg:leading-10 2xl:leading-[50px] tracking-tight max-h-12 xl:max-h-20 2xl:max-h-28 line-clamp-2 text-black lg:text-[26px] xl:text-[37px] 2xl:text-[44px]">
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
        <div className="z-10 px-1 w-[315px] mx-auto relative lg:absolute lg:bottom-[110px] lg:left-5 xl:left-[17%] 2xl:left-[21%] flex justify-between items-center gap-[10px] lg:gap-0 md:w-[700px] lg:w-[370px]">
          <div className="max-w-[225px] w-full h-[2px] bg-gray md:max-w-none">
            {/* 프로그레스 바 */}
            <div
              ref={progressBarRef}
              className="w-full h-[2px] bg-black transform scale-x-0 origin-left relative z-12"
            ></div>
          </div>
          <div className="flex items-center gap-1 ml-[25px] lg:ml-[20px] lg:mr-[60px]">
            {/* 슬라이드 번호 표시 */}
            <span className="text-black text-[11px] lg:text-base font-bold">
              {String(currentSlide).padStart(2, "0")}
            </span>
            <span className="text-black text-[11px] lg:text-base">/</span>
            <span className="text-black text-[11px] lg:text-base">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
          <div className="lg:flex lg:items-center lg:w-[200px] lg:justify-between">
            {/* 재생/정지 버튼 */}
            {showNavigation && (
              <>
                <div className="swiper-button-prev text-[18px] cursor-pointer">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
              </>
            )}
            <div
              className="max-w-[9px] w-full h-auto relative transform -translate-y-[2px] cursor-pointer lg:max-w-[15px]"
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
                <div className="swiper-button-next text-[18px] cursor-pointer">
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

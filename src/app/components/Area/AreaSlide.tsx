'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import Image from 'next/image';
import { AreaHeaderSlide, areaCodeMap } from '@/app/constant/SlideConstant';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons';
import Spinner from '@/app/components/Common/Spinner';
import { useAreaStore } from '@/app/stores/useAreaStore';
import { useLocationData } from '@/app/hooks/useTourData';

export default function AreaSlide() {
  // 상태 변수 및 훅
  const { selectedArea, setSelectedArea, userLocation } = useAreaStore();
  const { data: locationData } = useLocationData();

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const swiperRef = useRef<SwiperType | null>(null);

  // 슬라이드 클릭 시, 해당 슬라이드를 선택하고 활성화된 슬라이드 인덱스를 변경
  const handleSlideClick = (index: number) => {
    const selected = AreaHeaderSlide[index].title;
    setSelectedArea(selected);
    setActiveIndex(index);

    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  // selectedArea가 변경되면 해당 인덱스를 찾아 활성화된 슬라이드 인덱스를 설정
  useEffect(() => {
    const selectedIndex = AreaHeaderSlide.findIndex((slide) => slide.title === selectedArea);
    if (selectedIndex !== -1) {
      setActiveIndex(selectedIndex);
      if (swiperRef.current) {
        swiperRef.current.slideTo(selectedIndex, 0);
      }
    }
  }, [selectedArea]);

  // userLocation과 locationData가 존재할 경우, areaCode를 추출하고 해당 지역에 맞는 제목을 설정
  useEffect(() => {
    if (userLocation && locationData) {
      const areaCode = locationData.areaCode;

      if (areaCode) {
        const areaName = Object.keys(areaCodeMap).find((key) => areaCodeMap[key] === areaCode);
        if (areaName) {
          setSelectedArea(areaName);
        }
      }
    }
  }, [userLocation, locationData, setSelectedArea]);

  // activeIndex가 -1인 경우 로딩 상태로 Spinner 컴포넌트를 표시
  if (activeIndex === -1) {
    return (
      <div className="pb-5">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden lg:flex lg:w-full lg:items-center lg:justify-between lg:p-6 1xl:m-auto 1xl:w-[1000px]">
        {/* 이전 슬라이드 버튼 */}
        <div className="swiper-button-prev hidden cursor-pointer text-[22px] text-black lg:block">
          <FontAwesomeIcon icon={faCircleLeft} />
        </div>

        {/* Swiper 컴포넌트로 슬라이드들 렌더링 */}
        <div className="overflow-hidden lg:w-[900px]">
          <Swiper
            slidesPerView="auto"
            centeredSlides={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            initialSlide={activeIndex}
            modules={[Navigation]}
            effect="slide"
            grabCursor={true}
            className="h-full w-full"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {AreaHeaderSlide.map((slide, index) => (
              <SwiperSlide
                key={index}
                className={`ml-[8px] mr-[8px] flex h-full w-full max-w-[45px] md:max-w-[95px] lg:max-w-[65px]${
                  activeIndex === index
                    ? 'max-w-[52px] md:max-w-[105px] lg:max-w-[80px]'
                    : 'max-w-[45px] md:max-w-[95px] lg:max-w-[65px]'
                }`}
                onClick={() => handleSlideClick(index)}
              >
                <div
                  className={`flex h-full flex-col items-center justify-center ${
                    activeIndex === index
                      ? 'w-[52px] md:w-[105px] lg:w-[80px]'
                      : 'w-[45px] md:w-[95px] lg:w-[65px]'
                  }`}
                >
                  <Image
                    className={`h-full w-full rounded-full border-2 object-cover ${
                      activeIndex === index ? 'border-black' : 'border-transparent'
                    }`}
                    src={slide.image}
                    alt={slide.title}
                    width={52}
                    height={52}
                  />
                  <p
                    className={`mt-2 text-center text-[12px] ${
                      activeIndex === index
                        ? 'text-[13px] font-semibold lg:text-[20px]'
                        : 'font-normal lg:text-[17px]'
                    }`}
                  >
                    {slide.title} {/* 슬라이드 제목 표시 */}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 다음 슬라이드 버튼 */}
        <div className="swiper-button-next hidden cursor-pointer text-[22px] text-black lg:block">
          <FontAwesomeIcon icon={faCircleRight} />
        </div>
      </div>
    </>
  );
}

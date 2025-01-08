'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import Image from 'next/image';
import { AreaHeaderSlide } from '@/app/constant/SlideConstant';
import { useState, useRef, useEffect } from 'react';
import { AreaSlideProps } from '@/app/type/ItemType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons';

export default function AreaSlide({ selectedArea, setSelectedArea }: AreaSlideProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [initialized, setInitialized] = useState<boolean>(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideClick = (index: number) => {
    const selected = AreaHeaderSlide[index].title;
    setSelectedArea(selected);
    setActiveIndex(index);

    if (swiperRef.current) {
      swiperRef.current.slideTo(index, 300);
    }
  };

  useEffect(() => {
    const selectedIndex = AreaHeaderSlide.findIndex((slide) => slide.title === selectedArea);
    if (selectedIndex !== -1) {
      setActiveIndex(selectedIndex);
      setInitialized(true); // activeIndex가 설정된 후에 렌더링 시작
      if (swiperRef.current) {
        swiperRef.current.slideTo(selectedIndex, 0);
      }
    }
  }, [selectedArea]);

  return (
    <>
      <div className="1xl:w-[1000px] 1xl:m-auto lg:flex lg:w-full lg:items-center lg:justify-between lg:p-6">
        <div className="swiper-button-prev hidden cursor-pointer text-[22px] text-black lg:block">
          <FontAwesomeIcon icon={faCircleLeft} />
        </div>
        {initialized && (
          <div className="overflow-hidden lg:w-[900px]">
            <Swiper
              slidesPerView="auto"
              centeredSlides={true}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              initialSlide={activeIndex} // 초기 슬라이드 설정
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
                  className={`ml-[8px] mr-[8px] flex h-full w-full max-w-[52px] md:max-w-[95px] lg:max-w-[65px]${
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
                      {slide.title}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        <div className="swiper-button-next hidden cursor-pointer text-[22px] text-black lg:block">
          <FontAwesomeIcon icon={faCircleRight} />
        </div>
      </div>
    </>
  );
}

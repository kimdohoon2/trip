'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import Image from 'next/image';
import { AreaHeaderSlide } from '@/app/constant/SlideConstant';
import { useState, useRef, useEffect } from 'react';

export default function AreaSlide() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideClick = (index: number) => {
    setActiveIndex(index);
    // Swiper의 slideTo를 호출하면서 현재 중심 슬라이드로 이동
    if (swiperRef.current) {
      swiperRef.current.slideTo(index, 300); // 300ms 동안 이동
    }
  };

  useEffect(() => {
    // 초기 로드 시 첫 번째 슬라이드를 가운데로 설정
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex, 0);
    }
  }, [activeIndex]);

  return (
    <div className="overflow-hidden">
      <Swiper
        slidesPerView="auto"
        centeredSlides={true} // 슬라이드가 항상 가운데 정렬
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Navigation]}
        effect="slide"
        grabCursor={true}
        className="h-full w-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // Swiper 인스턴스 참조 저장
        }}
      >
        {AreaHeaderSlide.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="mx-[8px] flex h-full w-full max-w-[52px]"
            onClick={() => handleSlideClick(index)} // 클릭 이벤트 핸들러 추가
          >
            <div
              className={`flex h-full w-full flex-col items-center justify-center ${
                activeIndex === index ? 'w-[52px]' : 'w-[45px]'
              }`}
            >
              <Image
                className={`h-full w-full rounded-full object-cover ${
                  activeIndex === index ? 'border border-black' : 'border border-transparent'
                }`}
                src={slide.image}
                alt={slide.title}
                width={52}
                height={52}
              />
              <p
                className={`mt-2 text-center text-[12px] ${
                  activeIndex === index ? 'text-[13px] font-semibold' : 'font-normal'
                }`}
              >
                {slide.title}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

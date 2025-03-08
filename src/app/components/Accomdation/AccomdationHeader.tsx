import { Swiper, SwiperSlide } from 'swiper/react';
import { AreaHeaderSlide } from '@/app/constant/SlideConstant';

interface AccomdationHeaderProps {
  selectedArea: string;
  onSelect: (area: string) => void;
}

export default function AccomdationHeader({ selectedArea, onSelect }: AccomdationHeaderProps) {
  return (
    <Swiper slidesPerView="auto" spaceBetween={10} wrapperTag="ul">
      {AreaHeaderSlide.map((slide) => (
        <SwiperSlide
          key={slide.title}
          onClick={() => onSelect(slide.title)}
          tag="li"
          className={`hover-button !w-auto cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all ${
            selectedArea === slide.title
              ? 'bg-black text-white shadow-md'
              : 'text-gray-600 border-gray-200 hover:bg-gray-100 border bg-white'
          }`}
        >
          {slide.title}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

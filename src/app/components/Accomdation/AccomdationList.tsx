import { Swiper, SwiperSlide } from 'swiper/react';
import AccomdationCard from './AccomdationCard';
import { StayItem } from '@/app/types/ItemType';

interface AccomdationListProps {
  stays: StayItem[];
  onSlideChange: (index: number) => void;
}

export default function AccomdationList({ stays, onSlideChange }: AccomdationListProps) {
  return (
    <Swiper
      className="cursor-pointer !pb-3 lg:!pb-5 1xl:!pb-7"
      slidesPerView={1.2}
      spaceBetween={20}
      centeredSlides={true}
      loop={stays.length > 4}
      onSlideChange={(swiper) => onSlideChange(swiper.realIndex + 1)}
      breakpoints={{ 1024: { slidesPerView: 4 } }}
    >
      {stays.map((stay) => (
        <SwiperSlide key={stay.contentid}>
          <AccomdationCard stay={stay} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

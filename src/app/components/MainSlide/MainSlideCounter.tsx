import React from 'react';
import { MainSlideInfo } from '@/app/constant/SlideConstant';

interface MainSlideCounterProps {
  currentSlide: number;
}

const MainSlideCounter: React.FC<MainSlideCounterProps> = ({ currentSlide }) => {
  return (
    <div className="ml-[25px] flex items-center gap-1 lg:ml-[20px] lg:mr-[60px]">
      <span className="text-[11px] font-bold text-black lg:text-base">
        {String(currentSlide).padStart(2, '0')}
      </span>
      <span className="text-[11px] text-black lg:text-base">/</span>
      <span className="text-[11px] text-black lg:text-base">
        {String(MainSlideInfo.length).padStart(2, '0')}
      </span>
    </div>
  );
};

export default MainSlideCounter;

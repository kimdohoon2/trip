import React from 'react';
import { MainSlideInfo } from '@/app/constant/SlideConstant';

interface MainSlideCounterProps {
  currentSlide: number;
}

const MainSlideCounter: React.FC<MainSlideCounterProps> = ({ currentSlide }) => {
  return (
    <div className="ml-[1.5625rem] flex items-center gap-1 lg:ml-[1.25rem] lg:mr-[3.75rem]">
      <span className="text-[0.6875rem] font-bold text-black lg:text-base">
        {String(currentSlide).padStart(2, '0')}
      </span>
      <span className="text-[0.6875rem] text-black lg:text-base">/</span>
      <span className="text-[0.6875rem] text-black lg:text-base">
        {String(MainSlideInfo.length).padStart(2, '0')}
      </span>
    </div>
  );
};

export default MainSlideCounter;

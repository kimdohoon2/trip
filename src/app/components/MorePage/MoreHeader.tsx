'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AreaHeaderSlide } from '@/app/constant/SlideConstant';
import { useUIStore } from '@/app/stores/useAreaUiStore';
import { moreCategories } from '@/app/constant/SlideConstant';

export default function MoreHeader() {
  const { setSelectedArea, setSelectedCategory } = useUIStore();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    setSelectedCategory(moreCategories[index]);
  };

  const handleSlideClick = (index: number) => {
    setActiveIndex(index);
    setSelectedArea(AreaHeaderSlide[index].title);
  };

  return (
    <div className="bg-morebg lg:pt-28">
      <div className="1xl:m-auto 1xl:max-w-[62.5rem]">
        <div className="px-4 pt-7 lg:mx-auto lg:w-[37.5rem]">
          <ul className="relative flex justify-center overflow-hidden rounded-md border border-[#000] bg-[#fff]">
            <li
              className="more-header-slider"
              style={{ transform: `translateX(${selectedTab * 100}%)` }}
            ></li>
            {moreCategories.map((tab, index) => (
              <li
                key={index}
                className={`more-header w-1/3 cursor-pointer py-1 text-center text-sm transition-all lg:py-2 lg:text-lg ${
                  selectedTab === index ? 'selected text-[#fff]' : 'text-[#000]'
                }`}
                onClick={() => handleTabClick(index)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        <div className="py-7">
          {/* 가로 스크롤 커스텀 */}
          <div className="scroll-container px-4 pt-1 lg:pl-6 lg:pr-0">
            <div className="grid grid-cols-[repeat(9,_minmax(52px,_1fr))] grid-rows-2 gap-4">
              {AreaHeaderSlide.map((slide, index) => (
                <div
                  key={index}
                  className={`flex cursor-pointer flex-col items-center justify-center transition-all lg:w-[3.875rem] ${
                    activeIndex === index ? 'scale-105' : 'opacity-80'
                  }`}
                  onClick={() => handleSlideClick(index)}
                >
                  <Image
                    className={`rounded-full border-2 object-cover lg:w-full ${
                      activeIndex === index ? 'border-black' : 'border-transparent'
                    }`}
                    src={slide.image}
                    alt={slide.title}
                    width={52}
                    height={52}
                  />
                  <p
                    className={`mt-2 text-center text-[0.75rem] md:text-base ${
                      activeIndex === index
                        ? 'text-[0.8125rem] font-semibold lg:text-[1.25rem]'
                        : 'font-normal lg:text-[1.0625rem]'
                    }`}
                  >
                    {slide.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

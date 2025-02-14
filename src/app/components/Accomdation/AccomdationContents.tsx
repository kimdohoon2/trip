'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AccomdationDate } from '@/app/constant/SlideConstant';

export default function AccomdationContents() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  return (
    <section className="mt-6 px-4">
      {/* 아이콘 & 제목 */}
      <div className="flex items-center gap-2">
        {selectedIndex !== null && (
          <div className="w-9">
            <Image
              className="w-full"
              src={AccomdationDate[selectedIndex].image}
              alt="숙박아이콘"
              width={512}
              height={512}
            />
          </div>
        )}
        <h1 className="text-sm font-bold text-[#8B4513]">
          한국관광공사가 추천하는 숙박시설을 소개드립니다!
        </h1>
      </div>

      {/* 탭 메뉴 */}
      <div className="mt-5">
        <ul className="flex w-full rounded-[3.125rem] bg-[#8B4513] py-1">
          {AccomdationDate.map((item, index) => (
            <li
              key={index}
              className={`accomdation-li relative w-1/3 cursor-pointer text-center ${
                selectedIndex === index ? 'selected font-bold text-white underline' : 'text-gray'
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              {item.title}
            </li>
          ))}
        </ul>

        {/* 선택된 description만 표시 */}
        <div className="mt-3">
          {selectedIndex !== null && (
            <p className="bg-gray-100 rounded-md p-3 text-center text-sm">
              {AccomdationDate[selectedIndex].description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

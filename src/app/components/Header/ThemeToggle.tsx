'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDay, setIsDay] = useState<boolean>(true);

  useEffect(() => {
    // 초기 로드 시 localStorage에서 테마를 확인하고 적용
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDay(savedTheme === 'light');

    // 테마 클래스를 HTML에 적용
    document.documentElement.classList.add(savedTheme);
  }, []);

  const handleClick = () => {
    // 현재 테마를 반전시킴
    const newTheme = isDay ? 'dark' : 'light';

    // 테마 상태 업데이트
    setIsDay(!isDay);

    // 로컬 스토리지에 새로운 테마 저장
    localStorage.setItem('theme', newTheme);

    // HTML 클래스를 변경
    document.documentElement.classList.remove(isDay ? 'light' : 'dark');
    document.documentElement.classList.add(newTheme);
  };

  return (
    <div className="relative h-[1.875rem] w-[1.875rem] cursor-pointer lg:h-[2.5rem] lg:w-[2.5rem]">
      <div
        className={`z-1 transition-white-color absolute h-full w-full rounded-full border border-bordercolor transition-opacity duration-300 ${
          isDay ? 'bg-white opacity-100' : 'opacity-0'
        }`}
        onClick={handleClick}
      >
        <FontAwesomeIcon
          className="black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1rem] text-lightorange lg:text-[1.25rem]"
          icon={faSun}
        />
      </div>
      <div
        className={`z-2 transition-white-color absolute h-full w-full rounded-full border border-bordercolor transition-opacity duration-300 ${
          isDay ? 'opacity-0' : 'bg-black opacity-100'
        }`}
        onClick={handleClick}
      >
        <FontAwesomeIcon
          className="black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1rem] text-white lg:text-[1.25rem]"
          icon={faMoon}
        />
      </div>
    </div>
  );
}

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDay, setIsDay] = useState<boolean>(true);

  useEffect(() => {
    // 초기 로드 시 localStorage에서 테마를 확인하고 적용
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDay(savedTheme === "light");

    // 테마 클래스를 HTML에 적용
    document.documentElement.classList.add(savedTheme);
  }, []);

  const handleClick = () => {
    // 현재 테마를 반전시킴
    const newTheme = isDay ? "dark" : "light";

    // 테마 상태 업데이트
    setIsDay(!isDay);

    // 로컬 스토리지에 새로운 테마 저장
    localStorage.setItem("theme", newTheme);

    // HTML 클래스를 변경
    document.documentElement.classList.remove(isDay ? "light" : "dark");
    document.documentElement.classList.add(newTheme);
  };

  return (
    <div className="w-[30px] h-[30px] relative cursor-pointer">
      <div
        className={`w-full h-full border border-bordercolor rounded-full absolute z-1 transition-opacity duration-300 transition-background-color duration-300 ${
          isDay ? "opacity-100 bg-background" : "opacity-0"
        }`}
        onClick={handleClick}
      >
        <FontAwesomeIcon
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 foreground font-size-16 text-lightorange"
          icon={faSun}
        />
      </div>
      <div
        className={`w-full h-full border border-bordercolor rounded-full absolute z-2 transition-opacity duration-300 transition-background-color duration-300 ${
          isDay ? "opacity-0" : "opacity-100 bg-foreground"
        }`}
        onClick={handleClick}
      >
        <FontAwesomeIcon
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 foreground font-size-16 text-background"
          icon={faMoon}
        />
      </div>
    </div>
  );
}

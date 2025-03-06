'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import throttle from 'lodash/throttle';
import Navigation from '@/app/components/Header/Navigation';
import Search from '@/app/components/Header/Search';
import ThemeToggle from '@/app/components/Header/ThemeToggle';
import HeaderLogoIcon from '@/app/components/Header/HeaderLogoIcon';
import MobileNavigation from '@/app/components/Header/MoblieNavigation';

export default function Header() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const SCROLL_THRESHOLD = 50; // 스크롤 임계값 (픽셀 단위)
  const THROTTLE_DELAY = 200; // 스로틀링 딜레이 (밀리초 단위)

  const controlHeader = useMemo(
    () =>
      throttle(() => {
        if (typeof window !== 'undefined') {
          const currentScrollY = window.scrollY;

          if (window.innerWidth < 1024) {
            // 모바일 환경
            if (Math.abs(currentScrollY - lastScrollY) > SCROLL_THRESHOLD) {
              if (currentScrollY > lastScrollY) {
                // 아래로 스크롤
                setIsHeaderVisible(false);
              } else {
                // 위로 스크롤
                setIsHeaderVisible(true);
              }
              setLastScrollY(currentScrollY);
            }
          } else {
            // 데스크톱 환경
            setHeaderScrolled(currentScrollY > 10);
          }
        }
      }, THROTTLE_DELAY),
    [lastScrollY]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);
      window.addEventListener('resize', controlHeader);

      return () => {
        window.removeEventListener('scroll', controlHeader);
        window.removeEventListener('resize', controlHeader);
        controlHeader.cancel();
      };
    }
  }, [controlHeader]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 bg-white px-4 transition-all duration-300 md:px-3 lg:px-6 2xl:px-14 ${!isHeaderVisible ? '-translate-y-full' : 'translate-y-0'} ${headerScrolled ? 'lg:bg-white lg:shadow-md' : 'lg:bg-transparent'}`}
      >
        <div className="flex h-[50px] items-center justify-between lg:h-[90px]">
          <div className="h-[50px] w-[129px] lg:h-[36px] lg:w-[207px]">
            <Link className="relative block h-full w-full" href="/">
              <HeaderLogoIcon className="head-logo h-full w-full" />
            </Link>
          </div>
          <div className="hidden lg:block">
            <Navigation />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <Search />
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="block lg:hidden">
          <Search />
        </div>
        <div className="block lg:hidden">
          <Navigation />
        </div>
      </header>
      <div className="fixed bottom-0 left-0 z-40 block w-full bg-white lg:hidden">
        <MobileNavigation />
      </div>
    </>
  );
}

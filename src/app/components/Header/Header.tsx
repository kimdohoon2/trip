'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/app/components/Header/Navigation';
import Search from '@/app/components/Header/Search';
import ThemeToggle from '@/app/components/Header/ThemeToggle';
import LogoIcon from '@/app/components/Header/LogoIcon';

export default function Header() {
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        if (window.scrollY > 10) {
          setHeaderScrolled(true);
        } else {
          setHeaderScrolled(false);
        }
      } else {
        setHeaderScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 bg-white shadow-md lg:${headerScrolled ? 'bg-white shadow-md' : 'bg-transparent'} px-2 transition-colors duration-300 md:px-3 lg:px-6 2xl:px-14`}
    >
      <div className="flex h-[50px] items-center justify-between lg:h-[90px]">
        <div className="h-[50px] w-[129px] lg:h-[36px] lg:w-[207px]">
          <Link className="relative block h-full w-full" href="/">
            <LogoIcon className="head-logo h-full w-full" />
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
  );
}

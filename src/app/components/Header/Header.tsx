"use client";

import Link from "next/link";
import Navigation from "@/app/components/Header/Navigation";
import Search from "@/app/components/Header/Search";
import ThemeToggle from "@/app/components/Header/ThemeToggle";
import LogoIcon from "@/app/components/Header/LogoIcon";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white lg:bg-transparent px-2 md:px-3 lg:px-6 2xl:px-14">
      <div className="flex items-center justify-between h-[50px] lg:h-[90px]">
        <div className="w-[129px] h-[50px] lg:w-[207px] lg:h-[36px]">
          <Link className="block w-full h-full relative" href="/">
            <LogoIcon className="w-full h-full head-logo" />
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

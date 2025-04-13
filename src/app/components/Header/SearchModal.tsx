'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import Link from 'next/link';
import HeaderLogoIcon from '@/app/components/Header/HeaderLogoIcon';
import ThemeToggle from '@/app/components/Header/ThemeToggle';

interface SearchModalProps {
  keyword: string;
  setKeyword: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  recentSearches: string[];
  handleRecentSearchClick: (search: string) => void;
  clearRecentSearches: () => void;
  removeRecentSearch: (index: number) => void;
  onClose: () => void;
  recommendedSearches: string[]; // Added this property
  handleRecommendedSearchClick: (search: string) => void; // Added this property
}

const SearchModal: React.FC<SearchModalProps> = ({
  keyword,
  setKeyword,
  handleSearch,
  recentSearches,
  handleRecentSearchClick,
  clearRecentSearches,
  removeRecentSearch,
  onClose,
  recommendedSearches,
  handleRecommendedSearchClick,
}) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-screen w-full bg-white px-4 shadow-md md:px-3 lg:px-6 2xl:px-14"
      onClick={handleModalClick}
      initial={{ clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)' }} // 초기 상태
      animate={{ clipPath: 'polygon(100% 0, 0 0, 0 100%, 100% 100%)' }} // 열릴 때
      exit={{ clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)' }} // 닫힐 때
      transition={{ duration: 0.5, ease: 'easeInOut' }} // 트랜지션 설정
    >
      <div className="flex h-[3.125rem] items-center justify-between lg:h-[5.625rem]">
        <div className="h-[3.125rem] w-[8.0625rem] lg:h-[2.25rem] lg:w-[12.9375rem]">
          <Link className="relative block h-full w-full" href="/" onClick={onClose}>
            <HeaderLogoIcon className="head-logo h-full w-full" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-gray-200 relative h-[1.875rem] w-[1.875rem] cursor-pointer rounded-full border border-black lg:h-[2.5rem] lg:w-[2.5rem]"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </button>
          <ThemeToggle />
        </div>
      </div>
      <div className="lg:mx-auto lg:w-[62.5rem] lg:px-4">
        {/* 검색 폼 */}
        <form onSubmit={handleSearch} className="mb-[0.625rem] lg:mb-0">
          <div className="mr-0 box-border flex h-[2.1875rem] w-auto items-center justify-between rounded-full border border-black bg-white px-[1.25rem] lg:w-full lg:rounded-none lg:border-0 lg:border-b lg:border-b-black lg:bg-transparent lg:px-[0.625rem]">
            <input
              className="h-full w-full bg-transparent outline-none placeholder:text-[0.8125rem] lg:text-lg lg:placeholder:text-lg lg:placeholder:font-thin"
              type="text"
              placeholder="어디로 여행을 떠날 예정인가요?"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              autoFocus
            />
            {keyword && (
              <button
                type="button"
                onClick={() => setKeyword('')}
                className="mr-2 transition-opacity duration-200 hover:opacity-70"
              >
                <FontAwesomeIcon
                  className="text-[#6d6d6d] lg:text-lg lg:text-black"
                  icon={faTimes}
                />
              </button>
            )}
            <button type="submit">
              <FontAwesomeIcon
                className="text-[#6d6d6d] lg:text-lg lg:text-black"
                icon={faSearch}
              />
            </button>
          </div>
        </form>
        {/* 최근 검색어 */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold lg:text-lg">최근검색어</h2>
            {recentSearches.length > 0 && (
              <button onClick={clearRecentSearches} className="text-gray-500 text-sm lg:text-lg">
                전체 삭제
              </button>
            )}
          </div>
          <ul className="mt-2">
            {recentSearches.map((search, index) => (
              <li key={index} className="flex items-center justify-between py-1">
                <button
                  className="flex-grow text-left lg:text-lg"
                  onClick={() => handleRecentSearchClick(search)}
                >
                  {search}
                </button>
                <button onClick={() => removeRecentSearch(index)}>
                  <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 지역 검색어 */}
        <div className="mt-4">
          <h2 className="text-sm font-bold lg:text-lg">지역 추천 검색어</h2>
          <ul className="mt-4 grid grid-cols-3 gap-2">
            {recommendedSearches.map((search, index) => (
              <li
                key={index}
                onClick={() => handleRecommendedSearchClick(search)}
                className="cursor-pointer rounded-lg border border-bordercolor py-1 text-center text-sm transition-all duration-200 hover:bg-gray hover:text-white lg:text-lg"
              >
                {search}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchModal;

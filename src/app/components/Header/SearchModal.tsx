'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import LogoIcon from '@/app/components/Header/LogoIcon';
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
}) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[100] h-[100vh] w-full bg-white px-2 shadow-md transition-colors duration-300 md:px-3 lg:h-[50vh] lg:px-6 2xl:px-14"
      onClick={handleModalClick}
    >
      <div className="flex h-[50px] items-center justify-between lg:h-[90px]">
        <div className="h-[50px] w-[129px] lg:h-[36px] lg:w-[207px]">
          <Link className="relative block h-full w-full" href="/" onClick={onClose}>
            <LogoIcon className="head-logo h-full w-full" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-gray-200 relative h-[30px] w-[30px] cursor-pointer rounded-full border border-black lg:h-[40px] lg:w-[40px]"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
          </button>
          <ThemeToggle />
        </div>
      </div>
      <div className="block">
        <form onSubmit={handleSearch} className="mb-[10px] lg:mb-0">
          <div className="mr-0 box-border flex h-[35px] w-auto items-center justify-between rounded-full border border-black bg-white px-[20px] lg:w-full lg:rounded-none lg:border-0 lg:border-b lg:border-b-black lg:bg-transparent lg:px-[10px]">
            <input
              className="h-full w-full bg-transparent outline-none placeholder:text-[13px] lg:text-lg lg:placeholder:text-lg lg:placeholder:font-thin"
              type="text"
              placeholder="어디로 여행을 떠날 예정인가요?"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              autoFocus
            />
            <button type="submit">
              <FontAwesomeIcon
                className="text-[#6d6d6d] lg:text-lg lg:text-[black]"
                icon={faSearch}
              />
            </button>
          </div>
        </form>
      </div>
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
    </div>
  );
};

export default SearchModal;

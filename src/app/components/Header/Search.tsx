'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useInteractionStore } from '@/app/stores/useInteractionStore';
import Link from 'next/link';
import LogoIcon from '@/app/components/Header/LogoIcon';
import ThemeToggle from '@/app/components/Header/ThemeToggle';

const MAX_RECENT_SEARCHES = 10;

export default function Search() {
  const { keyword, setKeyword } = useInteractionStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const saveRecentSearches = (searches: string[]) => {
    localStorage.setItem('recentSearches', JSON.stringify(searches));
    setRecentSearches(searches);
  };

  const addRecentSearch = (search: string) => {
    const updatedSearches = [search, ...recentSearches.filter((s) => s !== search)].slice(
      0,
      MAX_RECENT_SEARCHES
    );
    saveRecentSearches(updatedSearches);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      addRecentSearch(keyword.trim());
      router.push(`/searchpage?keyword=${encodeURIComponent(keyword)}`);
    }
    setIsModalOpen(false);
  };

  const handleRecentSearchClick = (search: string) => {
    setKeyword(search);
    addRecentSearch(search);
    router.push(`/searchpage?keyword=${encodeURIComponent(search)}`);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const clearRecentSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };
  return (
    <>
      <form onSubmit={handleSearch} className="mb-[10px] lg:mb-0">
        <div className="mr-0 flex h-[35px] w-auto items-center justify-between rounded-full border-transparent bg-[#eef0f2] px-[20px] lg:w-[300px] lg:rounded-none lg:border-b lg:border-b-black lg:bg-transparent lg:px-[10px]">
          <input
            className="h-full w-full border-none bg-transparent outline-none placeholder:text-[13px] lg:placeholder:text-[18px] lg:placeholder:font-thin"
            type="text"
            placeholder="어디로 여행을 떠날 예정인가요?"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onClick={openModal}
          />
          <button type="button" onClick={openModal}>
            <FontAwesomeIcon
              className="text-[#6d6d6d] lg:text-[24px] lg:text-[black]"
              icon={faSearch}
            />
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="modal fixed left-0 right-0 top-0 z-[100] h-[100vh] w-full bg-white px-2 shadow-md transition-colors duration-300 md:px-3 lg:px-6 2xl:px-14">
          <div className="flex h-[50px] items-center justify-between lg:h-[90px]">
            <div className="h-[50px] w-[129px] lg:h-[36px] lg:w-[207px]">
              <Link
                className="relative block h-full w-full"
                href="/"
                onClick={() => setIsModalOpen(false)}
              >
                <LogoIcon className="head-logo h-full w-full" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="bg-gray-200 relative h-[30px] w-[30px] cursor-pointer rounded-full border border-black lg:h-[40px] lg:w-[40px]"
                onClick={() => setIsModalOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
              </button>
              <ThemeToggle />
            </div>
          </div>
          <div className="block">
            <form onSubmit={handleSearch} className="mb-[10px] lg:mb-0">
              <div className="mr-0 box-border flex h-[35px] w-auto items-center justify-between rounded-full border border-black bg-white px-[20px] lg:w-[300px] lg:rounded-none lg:border-b lg:border-b-black lg:bg-transparent lg:px-[10px]">
                <input
                  className="h-full w-full bg-transparent outline-none placeholder:text-[13px] lg:placeholder:text-[18px] lg:placeholder:font-thin"
                  type="text"
                  placeholder="어디로 여행을 떠날 예정인가요?"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  autoFocus
                />
                <button type="submit">
                  <FontAwesomeIcon
                    className="text-[#6d6d6d] lg:text-[24px] lg:text-[black]"
                    icon={faSearch}
                  />
                </button>
              </div>
            </form>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold">최근검색어</h2>
              {recentSearches.length > 0 && (
                <button onClick={clearRecentSearches} className="text-gray-500 text-sm">
                  전체 삭제
                </button>
              )}
            </div>
            <ul className="mt-2">
              {recentSearches.map((search, index) => (
                <li key={index} className="flex items-center justify-between py-1">
                  <button
                    className="flex-grow text-left"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    {search}
                  </button>
                  <button
                    onClick={() => {
                      const updatedSearches = recentSearches.filter((_, i) => i !== index);
                      saveRecentSearches(updatedSearches);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

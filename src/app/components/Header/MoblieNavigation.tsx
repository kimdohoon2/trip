import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHouseChimney, faMap, faUpLong } from '@fortawesome/free-solid-svg-icons';
import SearchModal from '@/app/components/Header/SearchModal';
import { useSearch } from '@/app/hooks/useSearch';

export default function MobileNavigation() {
  const {
    keyword,
    setKeyword,
    isModalOpen,
    openModal,
    closeModal,
    recentSearches,
    handleSearch,
    handleRecentSearchClick,
    clearRecentSearches,
    removeRecentSearch,
  } = useSearch();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav>
      <ul className="flex items-center justify-between lg:w-full lg:gap-[50px]">
        <li className="w-[25%] text-center lg:w-auto">
          <Link
            href="/"
            className="relative flex w-full flex-col gap-1 py-[10px] text-[14px] lg:text-[20px]"
          >
            <FontAwesomeIcon icon={faHouseChimney} /> <span>홈</span>
          </Link>
        </li>
        <li className="w-[25%] text-center lg:w-auto">
          <button
            onClick={openModal}
            className="relative flex w-full flex-col gap-1 py-[10px] text-[14px] lg:text-[20px]"
          >
            <FontAwesomeIcon icon={faSearch} /> <span>검색</span>
          </button>
        </li>
        <li className="w-[25%] text-center lg:w-auto">
          <Link
            href="/morepage"
            className="relative flex w-full flex-col gap-1 py-[10px] text-[14px] lg:text-[20px]"
          >
            <FontAwesomeIcon icon={faMap} /> <span>여행정보</span>
          </Link>
        </li>
        <li className="w-[25%] text-center lg:w-auto">
          <button
            onClick={scrollToTop}
            className="relative flex w-full flex-col gap-1 py-[10px] text-[14px] lg:text-[20px]"
          >
            <FontAwesomeIcon icon={faUpLong} /> <span>TOP</span>
          </button>
        </li>
      </ul>
      {isModalOpen && (
        <SearchModal
          keyword={keyword}
          setKeyword={setKeyword}
          handleSearch={handleSearch}
          recentSearches={recentSearches}
          handleRecentSearchClick={handleRecentSearchClick}
          clearRecentSearches={clearRecentSearches}
          removeRecentSearch={removeRecentSearch}
          onClose={closeModal}
        />
      )}
    </nav>
  );
}

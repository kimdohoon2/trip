import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHouseChimney, faMap } from '@fortawesome/free-solid-svg-icons';
import SearchModal from '@/app/components/Header/SearchModal';
import { useSearchLogic } from '@/app/hooks/useSearchLogic';
import ScrollToTopButton from '@/app/components/Common/ScrollToTopButton';

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
  } = useSearchLogic();

  return (
    <nav>
      <ul className="flex items-center justify-between lg:w-full lg:gap-[50px]">
        <li className="w-[25%] text-center lg:w-auto">
          <Link
            href="/"
            className="relative flex w-full flex-col gap-1 py-[10px] text-[14px] lg:text-[20px]"
            aria-label="메인으로 이동"
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
          <ScrollToTopButton
            buttonClassName="relative flex w-full flex-col gap-1 py-[10px] text-[14px] lg:text-[20px]"
            spanClassName="TOP"
          />
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

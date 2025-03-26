import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchModal from '@/app/components/Header/SearchModal';
import { useSearchLogic } from '@/app/hooks/useSearchLogic';
import { AnimatePresence } from 'framer-motion';

export default function Search() {
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
    recommendedSearches,
    handleRecommendedSearchClick,
  } = useSearchLogic();

  return (
    <>
      <form onSubmit={handleSearch} className="mb-[0.625rem] lg:mb-0">
        <div className="mr-0 flex h-[2.1875rem] w-auto items-center justify-between rounded-full border-transparent bg-[#eef0f2] px-[1.25rem] text-[#6d6d6d] lg:h-10 lg:w-10 lg:items-center lg:justify-center lg:rounded-full lg:border lg:border-bordercolor lg:bg-white lg:px-0 lg:text-xl lg:text-black">
          <input
            className="h-full w-full border-none bg-transparent outline-none placeholder:text-[0.8125rem] lg:hidden"
            type="text"
            placeholder="어디로 여행을 떠날 예정인가요?"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onClick={openModal}
          />
          <button type="button" onClick={openModal} aria-label="검색">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>

      <AnimatePresence>
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
            recommendedSearches={recommendedSearches}
            handleRecommendedSearchClick={handleRecommendedSearchClick}
          />
        )}
      </AnimatePresence>
    </>
  );
}

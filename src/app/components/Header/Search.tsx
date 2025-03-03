import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchModal from '@/app/components/Header/SearchModal';
import { useSearch } from '@/app/hooks/useSearch';

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
  } = useSearch();

  return (
    <>
      <form onSubmit={handleSearch} className="mb-[10px] lg:mb-0">
        <div className="mr-0 flex h-[35px] w-auto items-center justify-between rounded-full border-transparent bg-[#eef0f2] px-[20px] lg:h-10 lg:w-10 lg:items-center lg:justify-center lg:rounded-full lg:border lg:border-bordercolor lg:bg-white lg:px-0">
          <input
            className="h-full w-full border-none bg-transparent outline-none placeholder:text-[13px] lg:hidden"
            type="text"
            placeholder="어디로 여행을 떠날 예정인가요?"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onClick={openModal}
          />
          <button type="button" onClick={openModal}>
            <FontAwesomeIcon className="text-[#6d6d6d] lg:text-xl lg:text-black" icon={faSearch} />
          </button>
        </div>
      </form>
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
    </>
  );
}

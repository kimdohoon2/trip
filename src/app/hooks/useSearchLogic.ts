import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useInteractionStore } from '@/app/stores/useInteractionStore';

const MAX_RECENT_SEARCHES = 5;

export function useSearchLogic() {
  const { keyword, setKeyword, isModalOpen, openModal, closeModal } = useInteractionStore();
  const router = useRouter();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recommendedSearches] = useState([
    '제주도',
    '진해',
    '제천',
    '군산',
    '전주',
    '부산',
    '삼척',
    '강릉',
    '여수',
  ]);

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
    if (!search.trim() || search.length > 100) return;
    const updatedSearches = [search, ...recentSearches.filter((s) => s !== search)].slice(
      0,
      MAX_RECENT_SEARCHES
    );
    saveRecentSearches(updatedSearches);
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (keyword.trim()) {
      addRecentSearch(keyword.trim());
      router.push(`/searchpage?keyword=${encodeURIComponent(keyword)}`);
    }
    closeModal();
  };

  const handleRecentSearchClick = (search: string) => {
    setKeyword(search);
    addRecentSearch(search);
    router.push(`/searchpage?keyword=${encodeURIComponent(search)}`);
    closeModal();
  };

  const clearRecentSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  const removeRecentSearch = (index: number) => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    saveRecentSearches(updatedSearches);
  };
  const handleRecommendedSearchClick = (search: string) => {
    setKeyword(search);
    addRecentSearch(search);
    router.push(`/searchpage?keyword=${encodeURIComponent(search)}`);
    closeModal();
  };
  return {
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
  };
}

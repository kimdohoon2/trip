import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useInteractionStore } from '@/app/stores/useInteractionStore';

const MAX_RECENT_SEARCHES = 5;

export function useSearch() {
  const { keyword, setKeyword, isModalOpen, openModal, closeModal } = useInteractionStore();
  const router = useRouter();
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
  };
}

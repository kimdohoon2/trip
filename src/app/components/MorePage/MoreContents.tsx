'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MoreCard from '@/app/components/MorePage/MoreCard';
import MoreSkeleton from '@/app/components/MorePage/MoreSkeleton';
import DataError from '@/app/components/Common/Error';
import { useUIStore } from '@/app/stores/useAreaUiStore';
import useTourDataInfinites from '@/app/hooks/useTourDataInfinites';
import Toast from '@/app/components/Common/Toast';
import Modal from '@/app/components/Common/Modal';
import { useModalLogic } from '@/app/hooks/useModalLogic';

const MAX_ITEMS = 100;

export default function MoreContents() {
  const { selectedArea, selectedCategory } = useUIStore();
  const [numOfRows] = useState(24);
  const {
    data: moreData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useTourDataInfinites(selectedArea, numOfRows, selectedCategory);
  const { isModalOpen, openModal, closeModal } = useModalLogic();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && moreData.pages.flat().length < MAX_ITEMS) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, moreData]);

  if (isLoading) return <MoreSkeleton />;
  if (error) return <DataError />;

  const tourList = moreData?.pages.flat().slice(0, MAX_ITEMS) ?? [];

  return (
    <>
      <Toast />
      <MoreCard moreData={tourList} onClick={openModal} />

      {tourList.length < MAX_ITEMS && (
        <div ref={ref} style={{ height: 20, background: 'transparent' }} />
      )}

      {isFetchingNextPage && <MoreSkeleton />}

      {isModalOpen && <Modal onClose={closeModal} />}

      {tourList.length >= MAX_ITEMS && (
        <div className="py-4 text-center">최대 100개의 항목만 표시됩니다.</div>
      )}
    </>
  );
}

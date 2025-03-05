'use client';

import MoreCard from '@/app/components/MorePage/MoreCard';
import MoreSkeleton from '@/app/components/MorePage/MoreSkeleton';
import DataError from '@/app/components/Common/Error';
import { useUIStore } from '@/app/stores/useAreaUiStore';
import { useTourData } from '@/app/hooks/useTourData';
import { moreCategoryMap } from '@/app/constant/SlideConstant';
import Toast from '@/app/components/Common/Toast';
import Modal from '@/app/components/Common/Modal';
import { useModalLogic } from '@/app/hooks/useModalLogic';

export default function MoreContents() {
  const { selectedArea, selectedCategory } = useUIStore();
  const { data: moreData, isLoading, error } = useTourData(selectedArea);
  const { isModalOpen, openModal, closeModal } = useModalLogic();

  if (isLoading) return <MoreSkeleton />;
  if (error) return <DataError />;

  const filteredData = (moreData || []).filter(
    (item) =>
      selectedCategory === '' ||
      String(item.contenttypeid) === String(moreCategoryMap[selectedCategory])
  );

  return (
    <>
      <Toast />
      <MoreCard moreData={filteredData} onClick={openModal} />

      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
}

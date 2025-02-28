'use client';

import MoreCard from './MoreCard';
import Spinner from '@/app/components/Common/Spinner';
import DataError from '@/app/components/Common/Error';
import { useUIStore } from '@/app/stores/useAreaUiStore';
import { useTourData } from '@/app/hooks/useTourData';
import { moreCategoryMap } from '@/app/constant/SlideConstant';
import Toast from '@/app/components/Common/Toast';

export default function MoreContents() {
  const { selectedArea, selectedCategory } = useUIStore();
  const { data: moreData, isLoading, error } = useTourData(selectedArea);

  if (isLoading)
    return (
      <div className="mt-32">
        <Spinner />
        <p className="text-center">잠시만 기다려 주세요.</p>
      </div>
    );
  if (error) return <DataError />;

  const filteredData = (moreData || []).filter(
    (item) =>
      selectedCategory === '' ||
      String(item.contenttypeid) === String(moreCategoryMap[selectedCategory])
  );

  return (
    <>
      <Toast />
      <MoreCard moreData={filteredData} />
    </>
  );
}

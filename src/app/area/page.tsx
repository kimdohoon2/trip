'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AreaHeader from '@/app/components/Area/AreaHeader';
import AreaContents from '@/app/components/Area/AreaContents';
import { AreaItem } from '@/app/type/ItemType';
import { TourListApi } from '@/app/api/tourApi';

export default function AreaPage() {
  const [selectedArea, setSelectedArea] = useState<string>('전국');

  // 리액트 쿼리 훅을 사용하여 API 호출
  const {
    data: tourData,
    isLoading,
    error,
  } = useQuery<AreaItem[], Error>({
    queryKey: ['tourData', selectedArea],
    queryFn: () => TourListApi(selectedArea),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });

  return (
    <>
      <AreaHeader selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
      <AreaContents
        selectedArea={selectedArea}
        tourData={tourData || []}
        loading={isLoading}
        error={error?.message || null}
      />
    </>
  );
}

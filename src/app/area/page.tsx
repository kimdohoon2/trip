'use client';

import { useState, useEffect } from 'react';
import AreaHeader from '@/app/components/Area/AreaHeader';
import AreaContents from '@/app/components/Area/AreaContents';
import { AreaItem } from '@/app/type/ItemType';
import { TourListApi } from '@/app/api/tourApi';

export default function AreaPage() {
  const [tourData, setTourData] = useState<AreaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>('전국');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await TourListApi(selectedArea);
        if (Array.isArray(data)) {
          setTourData(data);
        } else {
          throw new Error('데이터 형식이 올바르지 않습니다.');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
          console.error('데이터 로딩 에러:', err);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedArea]);

  return (
    <>
      <AreaHeader selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
      <AreaContents
        selectedArea={selectedArea}
        tourData={tourData}
        loading={loading}
        error={error}
      />
    </>
  );
}

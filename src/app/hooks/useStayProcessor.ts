import { useMemo } from 'react';
import { StayItem } from '@/app/types/ItemType';

export function useStayProcessor(stayData: StayItem[] | undefined) {
  return useMemo(() => {
    if (!stayData) return [];
    return stayData.map((stay) => ({
      ...stay,
      addr1: stay.addr1.split(' ').slice(0, 2).join(' '), // 주소의 첫 두 부분만 사용
      title: stay.title.length > 12 ? stay.title.slice(0, 12) + '...' : stay.title, // 12자로 제한
    }));
  }, [stayData]);
}

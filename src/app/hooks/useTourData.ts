import { useQuery } from '@tanstack/react-query';
import { TourListApi } from '@/app/api/tourApi';
import { AreaItem } from '@/app/types/ItemType';

export function useTourData(selectedArea: string) {
  return useQuery<AreaItem[], Error>({
    queryKey: ['tourData', selectedArea],
    queryFn: () => TourListApi(selectedArea),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
}

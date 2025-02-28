import { useQuery } from '@tanstack/react-query';
import { getTourListApi } from '@/app/api/getTourListApi';
import { AreaItem } from '@/app/types/ItemType';

export function useTourData(selectedArea: string) {
  return useQuery<AreaItem[], Error>({
    queryKey: ['tourData', selectedArea],
    queryFn: () => getTourListApi(selectedArea),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
    enabled: !!selectedArea, // selectedArea가 있을 때만 쿼리 실행
  });
}

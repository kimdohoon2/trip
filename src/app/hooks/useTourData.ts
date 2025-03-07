import { useQuery } from '@tanstack/react-query';
import { getTourListApi } from '@/app/api/getTourListApi';
import { AreaItem } from '@/app/types/ItemType';

export function useTourData(selectedArea: string, numOfRows: number, pageNo: number) {
  return useQuery<AreaItem[], Error>({
    queryKey: ['tourData', selectedArea, numOfRows, pageNo],
    queryFn: () => getTourListApi(selectedArea, numOfRows, pageNo),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
    enabled: !!selectedArea, // selectedArea가 있을 때만 쿼리 실행
  });
}

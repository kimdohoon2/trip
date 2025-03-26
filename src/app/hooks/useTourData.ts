import { useQuery } from '@tanstack/react-query';
import { getTourListApi } from '@/app/api/getTourListApi';
import { AreaItem } from '@/app/types/ItemType';

export function useTourData(
  selectedArea: string,
  numOfRows: number,
  pageNo: number,
  category?: string
) {
  return useQuery<AreaItem[], Error>({
    queryKey: ['tourData', selectedArea, numOfRows, pageNo, category],
    queryFn: () => getTourListApi(selectedArea, numOfRows, pageNo, category),
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    enabled: !!selectedArea && !!category,
  });
}

import { useQuery } from '@tanstack/react-query';
import { getStayApi } from '@/app/api/getStayApi';
import { StayItem } from '@/app/types/ItemType';

export function useStayData(selectedArea: string) {
  return useQuery<StayItem[], Error>({
    queryKey: ['stayData', selectedArea],
    queryFn: () => getStayApi(selectedArea),
    staleTime: 5 * 60 * 1000,
    retry: 1, //
    enabled: !!selectedArea,
  });
}

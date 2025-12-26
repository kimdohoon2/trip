import { useQuery } from '@tanstack/react-query';
import { getLocationApi } from '@/app/api/getLocationApi';
import { LocationApiResponse } from '@/app/types/ItemType';

export function useLocationData(radius?: number, numOfRows?: number) {
  return useQuery<LocationApiResponse, Error>({
    queryKey: ['locationData', radius, numOfRows],
    queryFn: () => getLocationApi(radius, numOfRows),
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    enabled: false,
  });
}

import { useQuery } from '@tanstack/react-query';
import { getLocationApi } from '@/app/api/getLocationApi';
import { LocationApiResponse } from '@/app/types/ItemType';

export function useLocationData() {
  return useQuery<LocationApiResponse, Error>({
    queryKey: ['locationData'],
    queryFn: getLocationApi,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: false,
  });
}

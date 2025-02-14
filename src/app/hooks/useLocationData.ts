import { useQuery } from '@tanstack/react-query';
import { LocationApi } from '@/app/api/tourApi';
import { LocationApiResponse } from '@/app/types/ItemType';

export function useLocationData() {
  return useQuery<LocationApiResponse, Error>({
    queryKey: ['locationData'],
    queryFn: LocationApi,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: false,
  });
}

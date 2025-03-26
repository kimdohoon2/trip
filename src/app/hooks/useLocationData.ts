import { useQuery } from '@tanstack/react-query';
import { getLocationApi } from '@/app/api/getLocationApi';
import { LocationApiResponse } from '@/app/types/ItemType';

export function useLocationData(): ReturnType<typeof useQuery<LocationApiResponse, Error>> {
  return useQuery<LocationApiResponse, Error>({
    queryKey: ['locationData'],
    queryFn: getLocationApi,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    enabled: false,
  });
}

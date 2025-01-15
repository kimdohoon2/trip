import { useQuery } from '@tanstack/react-query';
import { TourListApi, LocationApi } from '@/app/api/tourApi';
import { AreaItem, LocationApiResponse } from '@/app/types/ItemType';

export function useTourData(selectedArea: string) {
  return useQuery<AreaItem[], Error>({
    queryKey: ['tourData', selectedArea],
    queryFn: () => TourListApi(selectedArea),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
}

export function useLocationData() {
  return useQuery<LocationApiResponse, Error>({
    queryKey: ['locationData'],
    queryFn: LocationApi,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: false,
  });
}

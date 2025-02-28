import { useQuery } from '@tanstack/react-query';
import { getEventApi } from '@/app/api/getEventApi';
import { EventItem } from '@/app/types/ItemType';

export function useEventData(selectedArea: string, eventStartDate: string) {
  return useQuery<EventItem[], Error>({
    queryKey: ['eventData', selectedArea, eventStartDate],
    queryFn: () => getEventApi(selectedArea, eventStartDate),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    enabled: !!selectedArea && !!eventStartDate,
  });
}

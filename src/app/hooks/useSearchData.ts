import { useQuery } from '@tanstack/react-query';
import { getSearchApi } from '@/app/api/getSearchApi';
import { SearchApiResponse } from '@/app/types/ItemType';

export function useSearchData(keyword: string, numOfRows: number, contentTypeId: string | null) {
  return useQuery<SearchApiResponse[], Error>({
    queryKey: ['searchData', keyword, numOfRows, contentTypeId],
    queryFn: () => getSearchApi(keyword, numOfRows, contentTypeId),
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    enabled: !!keyword,
  });
}

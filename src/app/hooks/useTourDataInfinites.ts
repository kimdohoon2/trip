import { useInfiniteQuery } from '@tanstack/react-query';
import { getTourListApi } from '@/app/api/getTourListApi';
import { AreaItem } from '@/app/types/ItemType';

const useTourDataInfinites = (
  selectedArea: string,
  numOfRows: number,
  category: string,
  initialData?: AreaItem[]
) => {
  return useInfiniteQuery<AreaItem[], Error>({
    queryKey: ['tourList', selectedArea, category],
    queryFn: ({ pageParam = 1 }) =>
      getTourListApi(selectedArea, numOfRows, pageParam as number, category),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < numOfRows ? undefined : allPages.length + 1;
    },
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30,
  });
};

export default useTourDataInfinites;

import Skeleton from '@/app/components/Common/Skeleton';

export default function SearchSectionSkeleton() {
  return (
    <div className="mx-4 mb-4 rounded-2xl bg-white p-4 shadow-md lg:mx-auto lg:mb-8 lg:w-[1000px]">
      <Skeleton className="mb-2 h-6 w-10" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="border-b border-bordercolor">
            <div className="flex gap-4">
              <Skeleton className="mb-2 h-16 w-24 lg:h-32 lg:w-44" />
              <div className="flex w-full justify-between">
                <div className="w-full">
                  <Skeleton className="mb-2 h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-[30px] w-[30px] rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="mt-4 h-10 w-full rounded" />
    </div>
  );
}

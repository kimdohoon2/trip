import Skeleton from '@/app/components/Common/Skeleton';

export default function MoreSkeleton() {
  return (
    <div className="grid w-full grid-cols-2 gap-3 px-4 lg:grid-cols-4 lg:gap-5 lg:px-6 1xl:m-auto 1xl:max-w-[62.5rem]">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="flex w-full flex-col">
          <div className="relative mb-2 aspect-[4/3] h-[34.38vw] w-full lg:h-[13.75rem]">
            <Skeleton className="h-full w-full rounded-lg" />
            <div className="absolute right-2 top-2 h-5 w-5 rounded-full lg:h-7 lg:w-7">
              <Skeleton className="h-full w-full rounded-full" />
            </div>
          </div>
          <div className="shadow-indigo-500/40 lg:shadow-lg">
            <div className="text-left lg:pl-3">
              <Skeleton className="mb-2 h-6 w-3/4" />
              <Skeleton className="mb-2 h-4 w-1/2" />
              <div className="mt-2 lg:mb-4 lg:mt-7">
                <Skeleton className="h-4 w-1/2 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

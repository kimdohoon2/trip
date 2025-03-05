import Skeleton from '@/app/components/Common/Skeleton';

export default function SearchContainerSkeleton() {
  return (
    <div className="inline-block h-full w-full lg:pt-24">
      <div className="lg:mx-auto lg:max-w-[1000px]">
        <div className="mb-4 bg-white lg:bg-transparent">
          <Skeleton className="m-4 h-8 w-16" />
          <div className="scroll-container">
            <div className="mb-4 flex space-x-2 px-4 lg:justify-between">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-8 w-24 flex-shrink-0 rounded-full lg:w-32" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

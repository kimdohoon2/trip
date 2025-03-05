import { EventItem } from '@/app/types/ItemType';

interface EventPaginationProps {
  eventData: EventItem[];
  activeIndex: number;
  onPaginationClick: (index: number) => void;
}

export default function EventPagination({
  eventData,
  activeIndex,
  onPaginationClick,
}: EventPaginationProps) {
  return (
    <div className="mt-4 flex justify-center">
      {eventData.map((_, pagination) => (
        <div
          key={pagination}
          className={`mx-1 h-2 cursor-pointer rounded-full border border-white ${
            pagination === activeIndex ? 'w-5 bg-white' : 'bg-gray-400 w-2'
          }`}
          onClick={() => onPaginationClick(pagination)}
        />
      ))}
    </div>
  );
}

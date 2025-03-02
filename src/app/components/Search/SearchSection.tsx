import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SearchApiResponse } from '@/app/types/ItemType';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';
import SearchPagination from './SearchPagination';

interface SearchSectionProps {
  contentTypeId: string;
  name: string;
  items: SearchApiResponse[];
  isExpanded: boolean;
  onExpand: (contentTypeId: string) => void;
}

const INITIAL_ITEMS = 5;
const ITEMS_PER_PAGE = 10;

export default function SearchSection({
  contentTypeId,
  name,
  items,
  isExpanded,
  onExpand,
}: SearchSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isExpanded) {
      setCurrentPage(1);
    }
  }, [isExpanded]);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = isExpanded ? (currentPage - 1) * ITEMS_PER_PAGE : 0;
  const endIndex = isExpanded ? startIndex + ITEMS_PER_PAGE : INITIAL_ITEMS;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowMore = () => {
    onExpand(contentTypeId);
  };

  return (
    <div className="mx-4 mb-4 rounded-2xl bg-white p-4 shadow-md">
      <h2 className="mb-2 text-base font-semibold">{name}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((item: SearchApiResponse) => (
          <div key={item.contentid} className="border-b border-bordercolor">
            <div className="flex gap-4">
              <div className="mb-2 h-16 w-24">
                <Image
                  className="h-full w-full object-cover"
                  src={item.firstimage || '/error/no-image.png'}
                  alt={item.title}
                  width={300}
                  height={225}
                />
              </div>
              <div>
                <h3 className="text-base font-semibold">{filterTitle(item.title)}</h3>
                <p className="text-sm">{filterAddress(item.addr1)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!isExpanded && items.length > INITIAL_ITEMS && (
        <button
          onClick={handleShowMore}
          className="mt-4 w-full rounded bg-black px-4 py-2 text-center text-white"
        >
          더보기 +
        </button>
      )}
      {isExpanded && items.length > ITEMS_PER_PAGE && (
        <SearchPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

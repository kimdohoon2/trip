import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { SearchApiResponse } from '@/app/types/ItemType';
import { filterAddress, filterTitle } from '@/app/utils/filterDate';
import SearchPagination from '@/app/components/Search/SearchPagination';
import createKakaoMapURL from '@/app/utils/createKakaoMapURL';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

interface SearchSectionProps {
  contentTypeId: string;
  name: string;
  items: SearchApiResponse[];
  isExpanded: boolean;
  onExpand: (contentTypeId: string) => void;
  onClick: () => void;
  keyword: string;
  highlightKeyword: (text: string, keyword: string) => React.ReactNode;
}

export default function SearchSection({
  contentTypeId,
  name,
  items,
  isExpanded,
  onExpand,
  onClick,
  keyword,
  highlightKeyword,
}: SearchSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [initialItems, setInitialItems] = useState(5);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) {
          setInitialItems(8);
        } else if (window.innerWidth >= 768) {
          setInitialItems(6);
        } else {
          setInitialItems(5);
        }
      }
    };

    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isExpanded) {
      setCurrentPage(1);
    }
  }, [isExpanded]);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = isExpanded ? (currentPage - 1) * ITEMS_PER_PAGE : 0;
  const endIndex = isExpanded ? startIndex + ITEMS_PER_PAGE : initialItems;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowMore = () => {
    onExpand(contentTypeId);
  };

  return (
    <div className="mx-4 mb-4 rounded-2xl bg-white p-4 shadow-md lg:mb-8">
      <h2 className="mb-2 text-base font-semibold">{name}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {currentItems.map((item: SearchApiResponse) => (
          <div
            key={item.contentid}
            className="cursor-pointer border-b border-bordercolor"
            onClick={onClick}
          >
            <div className="flex gap-4">
              <div className="mb-2 h-16 w-24 lg:h-32 lg:w-44">
                <Image
                  className="h-full w-full object-cover"
                  src={item.firstimage || '/error/no-image.png'}
                  alt={item.title}
                  width={300}
                  height={225}
                />
              </div>
              <div className="flex w-full justify-between">
                <div>
                  <h3 className="text-base font-semibold">
                    {' '}
                    {highlightKeyword(filterTitle(item.title), keyword)}
                  </h3>
                  <p className="text-sm"> {highlightKeyword(filterAddress(item.addr1), keyword)}</p>
                </div>
                <div>
                  <Link
                    className="hover-button relative inline-block h-[1.875rem] w-[1.875rem] rounded-full border border-bordercolor text-sm lg:text-base"
                    href={createKakaoMapURL(item.addr1)}
                    target="_blank"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <FontAwesomeIcon
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      icon={faMapLocationDot}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!isExpanded && items.length > initialItems && (
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

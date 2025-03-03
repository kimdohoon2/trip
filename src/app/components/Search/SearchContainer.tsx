'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchData } from '@/app/hooks/useSearchData';
import { SearchApiResponse } from '@/app/types/ItemType';
import { useInteractionStore } from '@/app/stores/useInteractionStore';
import Spinner from '@/app/components/Common/Spinner';
import DataError from '@/app/components/Common/Error';
import SearchSection from './SearchSection';

const contentTypeNames: { [key: string]: string } = {
  '12': '🏛️ 관광지',
  '14': '🎨 문화시설',
  '15': '🎉 행사',
  '32': '🏨 숙박',
  '39': '🍽️ 음식점',
};

export default function SearchContainer() {
  const { keyword } = useInteractionStore();
  const [numOfRows] = useState(1000);
  const [contentTypeId, setContentTypeId] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const prevKeywordRef = useRef<string>('');

  const { data, isLoading, isError, error, refetch } = useSearchData(
    keyword,
    numOfRows,
    contentTypeId
  );

  useEffect(() => {
    if (keyword !== prevKeywordRef.current) {
      setContentTypeId(null);
      setExpandedCategory(null);
      prevKeywordRef.current = keyword;
    }
    if (keyword) {
      refetch();
    }
  }, [keyword, contentTypeId, refetch]);

  const groupDataByContentType = (data: SearchApiResponse[]) => {
    return data.reduce(
      (acc, item) => {
        const contentType = item.contenttypeid;
        if (contentType && contentTypeNames[contentType]) {
          if (!acc[contentType]) {
            acc[contentType] = [];
          }
          acc[contentType].push(item);
        }
        return acc;
      },
      {} as { [key: string]: SearchApiResponse[] }
    );
  };

  const handleCategoryChange = (id: string | null) => {
    setContentTypeId(id);
    setExpandedCategory(null);
  };

  const handleExpandCategory = (id: string) => {
    setExpandedCategory(id);
    setContentTypeId(id);
  };

  if (!keyword) {
    return (
      <div className="mx-auto p-4 text-center lg:mt-28">
        <h1 className="text-2xl font-bold">검색을 해주세요</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-32">
        <Spinner />
        <p className="text-center">잠시만 기다려 주세요.</p>
      </div>
    );
  }

  if (error && isError) {
    return (
      <div className="mt-7 flex flex-col items-center gap-3">
        <DataError />
      </div>
    );
  }

  const groupedData = data ? groupDataByContentType(data) : {};
  const hasAnyResults = Object.values(groupedData).some((group) => group.length > 0);

  if (!hasAnyResults) {
    return (
      <div className="mx-auto p-4 text-center lg:mt-[90px]">
        <h1 className="mb-4 text-xl font-bold">{`"${keyword}" 검색 결과`}</h1>
        <p className="text-gray-600 text-sm">검색 결과가 없습니다. 다른 키워드로 검색해 보세요.</p>
      </div>
    );
  }

  return (
    <div className="inline-block h-full w-full bg-[#f4f6f8] lg:pt-24">
      <div className="lg:mx-auto lg:max-w-[1000px]">
        <div className="mb-4 bg-white lg:bg-transparent">
          <h1 className="p-4 text-xl font-bold">{`"${keyword}" 검색 결과`}</h1>
          <div className="scroll-container">
            <div className="mb-4 flex space-x-2 px-4 lg:justify-between">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`w-24 flex-shrink-0 rounded-full border border-black px-3 py-1 text-sm lg:w-auto lg:px-10 lg:text-lg ${
                  !contentTypeId ? 'bg-black text-white' : 'bg-gray-200 bg-white'
                }`}
              >
                전체
              </button>
              {Object.entries(contentTypeNames).map(([id, name]) => (
                <button
                  key={id}
                  onClick={() => handleCategoryChange(id)}
                  className={`w-24 flex-shrink-0 rounded-full border border-black px-1 py-1 text-sm lg:w-auto lg:px-10 lg:text-lg ${
                    contentTypeId === id ? 'bg-black text-white' : 'bg-gray-200 bg-white'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {contentTypeId === null
          ? Object.entries(contentTypeNames).map(([id, name]) => (
              <SearchSection
                key={id}
                contentTypeId={id}
                name={name}
                items={groupedData[id] || []}
                isExpanded={expandedCategory === id}
                onExpand={() => handleExpandCategory(id)}
              />
            ))
          : contentTypeNames[contentTypeId] && (
              <SearchSection
                contentTypeId={contentTypeId}
                name={contentTypeNames[contentTypeId]}
                items={groupedData[contentTypeId] || []}
                isExpanded={expandedCategory === contentTypeId}
                onExpand={() => handleExpandCategory(contentTypeId)}
              />
            )}
      </div>
    </div>
  );
}

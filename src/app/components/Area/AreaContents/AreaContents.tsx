'use client';

import { useMemo, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import { Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import { categoryMap } from '@/app/constant/SlideConstant';
import { useTourData, useLocationData } from '@/app/hooks/useTourData';
import { useAreaStore } from '@/app/stores/useAreaStore';
import Spinner from '@/app/components/Common/Spinner';
import Toast from '../../Common/Toast';
import CategorySelector from './CategorySelector';
import ProgressBar from './ProgressBar';
import MoreButton from './MoreButton';
import AreaError from './AreaError';
import AreaEmptyState from './AreaEmptyState';
import AreaSlideProps from './AreaSlideProps';
import { AreaItem } from '@/app/types/ItemType';

export default function AreaContents() {
  // 상태값 가져오기
  const {
    selectedArea,
    category,
    setCurrentPage,
    slidesPerView,
    windowSize,
    setWindowSize,
    userLocation,
    setUserLocation,
    setSelectedArea,
  } = useAreaStore();

  // 여행지 데이터 가져오기
  const {
    data: tourData = [],
    isLoading: isTourLoading,
    error: tourError,
  } = useTourData(selectedArea);

  // 위치 데이터 가져오기
  const {
    data: locationData,
    refetch: refetchLocationData,
    isLoading: isLocationLoading,
  } = useLocationData();

  // 카테고리 필터링 및 데이터 가공 함수
  const processData = useCallback(
    (data: AreaItem[]) => {
      const categoryId = categoryMap[category];
      return data
        .filter((item) => (categoryId ? String(item.contenttypeid) === String(categoryId) : true))
        .map((item) => ({
          ...item,
          addr1: item.addr1.split(' ').slice(0, 2).join(' '), // 주소 가공
        }));
    },
    [category] // 카테고리 변경 시 업데이트
  );

  // 필터링된 데이터와 사용할 수 있는 카테고리 계산
  const { filteredData, availableCategories } = useMemo(() => {
    const categories = ['음식점 🍽️', '관광지 🏛️', '문화시설 🎨'];
    const availableCategories = categories.filter((item) => item !== category); // 현재 카테고리를 제외한 나머지 카테고리

    // 사용자 위치에 따라 데이터 결정
    const dataToProcess = userLocation ? locationData?.items || [] : tourData;
    const processedData = processData(dataToProcess);

    // 화면 크기에 따른 최대 항목 수 설정
    const maxItems = windowSize >= 1024 ? 8 : 10;
    return {
      filteredData: processedData.slice(0, maxItems), // 최대 항목 수 만큼 필터링
      availableCategories,
    };
  }, [userLocation, locationData, tourData, category, windowSize, processData]);

  // 슬라이드 변경 시 페이지 번호 업데이트
  const handleSlideChange = useCallback(
    (swiper: SwiperClass) => {
      setCurrentPage(swiper.realIndex + 1); // 현재 페이지 번호 설정
    },
    [setCurrentPage]
  );

  // 고유 키 생성 함수 (여행지나 위치에 따라 다르게 설정)
  const generateKey = (item: AreaItem) => {
    const prefix = userLocation ? 'location-' : 'tour-'; // 사용자 위치 여부에 따라 키 접두사 설정
    return `${prefix}${item.contentid}`; // 고유 키 생성
  };

  // 화면 크기 변경 시 처리
  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth); // 화면 크기 계산
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 이벤트 제거
  }, [setWindowSize]);

  // 사용자 위치가 있을 경우 위치 데이터를 새로 가져와서 선택된 지역 설정
  useEffect(() => {
    if (userLocation) {
      refetchLocationData().then((result) => {
        if (result.data) {
          setSelectedArea(result.data.areaCode); // 위치 데이터에 따라 지역 설정
        }
      });
    }
  }, [userLocation, refetchLocationData, setSelectedArea]);

  // 선택된 지역이나 사용자 위치 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1); // 페이지 초기화
  }, [userLocation, selectedArea, setCurrentPage]);

  // 선택된 지역 변경 시 사용자 위치 초기화
  useEffect(() => {
    setUserLocation(null); // 사용자 위치 초기화
  }, [selectedArea, setUserLocation]);

  // 지역 이름 설정
  const regionText = selectedArea === '전국' ? '대한민국 구석구석,' : '우리지역,';

  // 전체 페이지 수 계산
  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / slidesPerView),
    [filteredData.length, slidesPerView] // 데이터 길이와 slidesPerView 값 변경 시 계산
  );

  // 로딩 상태 및 에러 상태 결정
  const isLoading = userLocation ? isLocationLoading : isTourLoading;
  const error = userLocation ? null : tourError;

  // 로딩 중일 때 표시할 UI
  if (isLoading) {
    return (
      <div className="mt-60">
        <Spinner />
        <p className="text-center">잠시만 기다려 주세요.</p>
      </div>
    );
  }

  // 에러 발생 시 표시할 UI
  if (error) {
    return (
      <div className="mt-7 flex flex-col items-center gap-3">
        <AreaError />
      </div>
    );
  }

  return (
    <>
      <Toast />
      <section className="relative -top-5 rounded-tl-[20px] bg-white pb-10 pl-4 pt-5 lg:-top-0 lg:px-6 lg:pb-12 lg:pt-12 1xl:m-auto 1xl:max-w-[1000px] 1xl:pl-0 1xl:pr-0">
        <h2 className="text-lg lg:text-2xl">{regionText}</h2>
        <CategorySelector availableCategories={availableCategories} />

        {filteredData.length === 0 ? (
          <AreaEmptyState />
        ) : (
          <>
            <Swiper
              slidesPerView={2.5}
              grid={{ rows: 2 }}
              breakpoints={{
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 4 },
              }}
              modules={[Grid]}
              onSlideChange={handleSlideChange} // 슬라이드 변경 시 처리
              className="mt-[20px] h-full w-full lg:mt-[50px]"
            >
              {filteredData.map((item) => (
                <SwiperSlide
                  key={generateKey(item)} // 고유 키를 이용해 슬라이드 생성
                  className="flex w-full max-w-[300px] flex-row items-center justify-center pb-[15px] pr-[15px] lg:pb-[30px]"
                >
                  <AreaSlideProps item={item} /> {/* 슬라이드 아이템 */}
                </SwiperSlide>
              ))}
            </Swiper>
            <ProgressBar totalPages={totalPages} /> {/* 진행 상태 바 */}
            <MoreButton /> {/* 더 보기 버튼 */}
          </>
        )}
      </section>
    </>
  );
}

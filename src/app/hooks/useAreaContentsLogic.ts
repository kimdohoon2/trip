import { useMemo, useCallback, useEffect, useState } from 'react';
import { useTourData } from '@/app/hooks/useTourData';
import { useLocationData } from '@/app/hooks/useLocationData';
import { categories } from '@/app/constant/SlideConstant';
import { useInteractionStore } from '@/app/stores/useInteractionStore';
import { useLocationStore } from '@/app/stores/useLocationStore';
import { useUIStore } from '@/app/stores/useAreaUiStore';
import { AreaItem } from '@/app/types/ItemType';

export const useAreaContentsLogic = () => {
  const { selectedArea, slidesPerView, setWindowSize, setSelectedArea } = useUIStore();
  const { category, setCurrentPage } = useInteractionStore();
  const { userLocation, setUserLocation } = useLocationStore();
  const [numOfRows] = useState(8);
  const [pageNo] = useState(1);

  // 여행지 데이터 가져오기
  const {
    data: tourData = [],
    isLoading: isTourLoading,
    error: tourError,
  } = useTourData(selectedArea, numOfRows, pageNo, category);
  const {
    data: locationData,
    refetch: refetchLocationData,
    isLoading: isLocationLoading,
  } = useLocationData();

  // 카테고리 필터링 및 데이터 가공 함수
  const processData = useCallback((data: AreaItem[]) => {
    return data.map((item) => ({
      ...item,
      addr1: item.addr1.split(' ').slice(0, 2).join(' '),
      title: item.title.length > 10 ? item.title.slice(0, 10) + '...' : item.title,
    }));
  }, []);

  const { filteredData, availableCategories } = useMemo(() => {
    const availableCategories = categories.filter((item) => item !== category);

    const dataToProcess = userLocation ? locationData?.items || [] : tourData;
    const processedData = processData(dataToProcess);

    return {
      filteredData: processedData,
      availableCategories,
    };
  }, [userLocation, locationData, tourData, category, processData]);

  // 슬라이드 변경 시 페이지 번호 업데이트
  const handleSlideChange = useCallback(
    (swiper: { realIndex: number }) => {
      setCurrentPage(swiper.realIndex + 1);
    },
    [setCurrentPage]
  );

  const generateKey = (item: AreaItem) => {
    const prefix = userLocation ? 'location-' : 'tour-';
    return `${prefix}${item.contentid}`;
  };

  // 화면 크기 변경 시 처리
  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setWindowSize]);

  // 위치 변경 시 처리
  useEffect(() => {
    if (userLocation) {
      refetchLocationData().then((result) => {
        if (result.data) {
          setSelectedArea(result.data.areaCode);
        }
      });
    }
  }, [userLocation, refetchLocationData, setSelectedArea]);

  useEffect(() => {
    setCurrentPage(1);
  }, [userLocation, selectedArea, category, setCurrentPage]);

  useEffect(() => {
    setUserLocation(null);
  }, [selectedArea, setUserLocation]);

  const regionText = selectedArea === '전국' ? '대한민국 구석구석,' : '우리지역,';

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / slidesPerView),
    [filteredData.length, slidesPerView]
  );

  return {
    filteredData,
    availableCategories,
    isTourLoading,
    isLocationLoading,
    tourError,
    regionText,
    totalPages,
    handleSlideChange,
    generateKey,
    isLoading: userLocation ? isLocationLoading : isTourLoading,
    error: userLocation ? null : tourError,
  };
};

'use client';

import { useMemo, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import { Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import { categoryMap } from '@/app/constant/SlideConstant';
import { useTourData } from '@/app/hooks/useTourData';
import { useAreaStore } from '@/app/stores/useAreaStore';
import Spinner from '@/app/components/Common/Spinner';
import Toast from '../../Common/Toast';
import CategorySelector from './CategorySelector';
import ProgressBar from './ProgressBar';
import MoreButton from './MoreButton';
import AreaError from './AreaError';
import AreaEmptyState from './AreaEmptyState';
import AreaSlideProps from './AreaSlideProps';
import { LocationApi } from '@/app/api/tourApi';

export default function AreaContents() {
  const {
    selectedArea,
    category,
    setCurrentPage,
    slidesPerView,
    windowSize,
    setWindowSize,
    userLocation,
    setFilteredTourData,
  } = useAreaStore();
  const { data: tourData = [], isLoading, error } = useTourData(selectedArea);

  // 사용자 위치 기반 관광 데이터 로드
  useEffect(() => {
    const fetchLocationData = async () => {
      if (userLocation) {
        try {
          const locationData = await LocationApi(); // 위치 기반 관광지 데이터를 가져옵니다.

          if (!locationData || locationData.length === 0) {
            console.warn('위치 기반 데이터가 비어 있습니다.');
            setFilteredTourData([]); // 비어 있는 데이터를 상태에 반영
            return;
          }

          setFilteredTourData(locationData); // 정상적인 데이터 설정
        } catch (err) {
          console.error('위치 기반 데이터 로드 오류:', err); // 오류 기록
        }
      }
    };

    fetchLocationData();
  }, [userLocation, setFilteredTourData]); // userLocation이 바뀔 때마다 호출

  // 지역에 따라 텍스트 변경
  const regionText = selectedArea === '전국' ? '대한민국 구석구석,' : '우리지역,';

  // 화면 크기 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (tourData && tourData.length > 0) {
      setCurrentPage(1); // 데이터가 변경되면 페이지를 초기화
    }
  }, [tourData, category]); // tourData나 category가 변경될 때만 실행

  // useMemo를 활용해 불필요한 렌더링방지
  const { filteredTourData, availableCategories } = useMemo(() => {
    const categories = ['음식점 🍽️', '관광지 🏛️', '문화시설 🎨'];
    const availableCategories = categories.filter((item) => item !== category);

    const categoryId = categoryMap[category];
    const filteredData = tourData
      .filter((item) => {
        return categoryId ? String(item.contenttypeid) === String(categoryId) : true;
      })
      .map((item) => ({
        ...item,
        addr1: item.addr1.split(' ').slice(0, 2).join(' '), // '서울특별시 ○○구'로 축약
      }));

    if (isLoading || error) {
      return { filteredTourData: [], availableCategories: [] };
    }

    // 화면 크기에 따라 데이터 슬라이싱
    const maxItems = windowSize >= 1024 ? 8 : 10;
    return {
      filteredTourData: filteredData.slice(0, maxItems), // 슬라이싱된 데이터 반환
      availableCategories,
    };
  }, [isLoading, error, tourData, category, windowSize]);

  const { filteredLocationData } = useMemo(() => {
    // 위치 기반 데이터 필터링
    if (!userLocation) {
      return { filteredLocationData: [] }; // 위치 기반 데이터가 없으면 빈 배열 반환
    }

    const locationData = filteredTourData.slice(0, 10); // 예시로 10개만 가져오기
    return {
      filteredLocationData: locationData,
    };
  }, [userLocation, filteredTourData]);

  // 페이지네이션 상태 업데이트
  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentPage(swiper.realIndex + 1);
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredTourData.length / slidesPerView);

  // 로딩화면
  if (isLoading) {
    return (
      <div className="mt-60">
        <Spinner />
        <p className="text-center">잠시만 기다려 주세요.</p>
      </div>
    );
  }

  // 에러화면
  if (error) {
    return (
      <div className="mt-7 flex flex-col items-center gap-3">
        <AreaError />
      </div>
    );
  }

  // UI 렌더링
  const combinedData = [...filteredLocationData, ...filteredTourData];
  return (
    <>
      <Toast />
      <section className="relative -top-5 rounded-tl-[20px] bg-white pb-10 pl-4 pt-5 lg:-top-0 lg:px-6 lg:pb-12 lg:pt-12 1xl:m-auto 1xl:max-w-[1000px] 1xl:pl-0 1xl:pr-0">
        <h2 className="text-lg lg:text-2xl">{regionText}</h2>
        <CategorySelector availableCategories={availableCategories} />

        {filteredTourData.length === 0 ? (
          <AreaEmptyState />
        ) : (
          <>
            <Swiper
              slidesPerView={2.5}
              grid={{
                rows: 2,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2.5,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              modules={[Grid]}
              onSlideChange={handleSlideChange}
              className="mt-[20px] h-full w-full lg:mt-[50px]"
            >
              {combinedData.map((item) => (
                <SwiperSlide
                  key={item.contentid}
                  className="flex w-full max-w-[300px] flex-row items-center justify-center pb-[15px] pr-[15px] lg:pb-[30px]"
                >
                  <AreaSlideProps item={item} />
                </SwiperSlide>
              ))}
            </Swiper>

            <ProgressBar totalPages={totalPages} />
            <MoreButton />
          </>
        )}
      </section>
    </>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import { Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { categoryMap } from '@/app/constant/SlideConstant';
import { useTourData } from '@/app/hooks/useTourData';
import { useAreaStore } from '@/app/stores/useAreaStore';
import { useToastStore } from '@/app/stores/useToastStore';
import Spinner from '@/app/components/Common/Spinner';
import Toast from '../Common/Toast';

export default function AreaContents() {
  const {
    selectedArea,
    visible,
    setVisible,
    heartStates,
    setHeartStates,
    category,
    setCategory,
    currentPage,
    setCurrentPage,
    slidesPerView,
    windowSize,
    setWindowSize,
  } = useAreaStore();
  const { data: tourData = [], isLoading, error } = useTourData(selectedArea);

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

  const toggleHeart = (contentid: string) => {
    const isLiked = heartStates[contentid];

    if (isLiked) {
      setHeartStates((prevStates) => ({
        ...prevStates,
        [contentid]: false,
      }));
      useToastStore.setState({
        message: '좋아요가 취소되었습니다!',
        type: 'error', // 취소 시 에러 타입
      });
    } else {
      setHeartStates((prevStates) => ({
        ...prevStates,
        [contentid]: true,
      }));
      useToastStore.setState({
        message: '좋아요를 클릭하셨습니다!',
        type: 'success', // 추가 시 성공 타입
      });
    }
  };

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
        <div className="w-[122px]">
          <Image
            className="h-full w-full object-cover"
            src="/error/data-error.svg"
            alt="data-error"
            width={120}
            height={120}
          ></Image>
        </div>
        <div className="text-center text-red-600">오류</div>
      </div>
    );
  }

  return (
    <>
      <Toast />
      <section className="relative -top-5 rounded-tl-[20px] bg-white pb-10 pl-4 pt-5 lg:-top-0 lg:px-6 lg:pb-12 lg:pt-12 1xl:m-auto 1xl:max-w-[1000px] 1xl:pl-0 1xl:pr-0">
        <h2 className="text-lg lg:text-2xl">{regionText}</h2>
        <div className="align-center relative flex items-center">
          <span className="mr-2 text-sm text-bgopacity lg:text-2xl">다양한</span>
          <button onClick={() => setVisible(!visible)}>
            <div className="z-20 flex w-[120px] justify-between border-b border-black bg-white text-lg font-bold lg:w-[170px] lg:text-3xl 1xl:w-[195px]">
              {category}
              <span>
                <FontAwesomeIcon
                  className={`z-20 text-sm text-black transition-transform duration-300 lg:text-2xl ${visible ? 'rotate-180' : ''}`}
                  icon={faAngleDown}
                />
              </span>
            </div>
            <ul
              aria-hidden={!visible}
              className={`absolute top-[29px] z-10 w-full max-w-[120px] lg:top-[38px] lg:max-w-[170px] ${visible ? 'block' : 'hidden'}`}
            >
              {availableCategories.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setVisible(false);
                  }}
                  className="lg:pl-1.25 pt-1.25 pr-1.25 pb-1.25 flex w-full justify-between border-b border-black bg-white pl-0.5 font-bold text-bgopacity lg:pb-2.5 lg:pr-2.5 lg:pt-2.5 lg:text-3xl"
                >
                  {item}
                </li>
              ))}
            </ul>
          </button>
          <span className="ml-2 text-sm text-bgopacity lg:text-2xl">알려드릴게요!</span>
        </div>
        {filteredTourData.length === 0 ? (
          <div className="mt-7 flex flex-col items-center gap-3">
            <div className="w-[122px]">
              <Image
                className="h-full w-full object-cover"
                src="/error/error.png"
                alt="error"
                width={122}
                height={114}
              />
            </div>
            <div className="flex h-full items-center justify-center text-lg text-black">
              찾으시는 지역에 데이터가 없습니다:)
            </div>
            <div className="flex h-full items-center justify-center text-bgopacity">
              다른지역을 선택해주세요
            </div>
          </div>
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
              {filteredTourData.map((item) => (
                <SwiperSlide
                  key={item.contentid}
                  className="flex w-full max-w-[300px] flex-row items-center justify-center pb-[15px] pr-[15px] lg:pb-[30px]"
                >
                  <div>
                    <div className="relative aspect-[4/3] h-[34.38vw] w-full overflow-hidden rounded-md lg:aspect-square lg:h-full">
                      <Image
                        className="h-full w-full object-cover"
                        src={item.firstimage}
                        alt={item.title}
                        width={300}
                        height={225}
                        priority
                      />
                      <div
                        onClick={() => toggleHeart(item.contentid)}
                        className="absolute right-2 top-2 h-5 w-5 cursor-pointer rounded-full bg-white lg:h-7 lg:w-7"
                      >
                        <FontAwesomeIcon
                          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm ${heartStates[item.contentid] ? 'text-[#ff6b6b]' : 'text-black opacity-[50%]'} transition-transform duration-300`}
                          icon={faHeart}
                        />
                      </div>
                    </div>
                    <div className="shadow-indigo-500/40 lg:shadow-lg">
                      <p className="mt-2 text-center text-[13px] font-bold lg:text-lg">
                        {item.title}
                      </p>
                      <p className="text-center text-[11px] text-bordercolor lg:pb-3 lg:text-[15px]">
                        {item.addr1 || '주소를 준비중입니다.'}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 프로그레스 바 */}
            <div className="m-auto mb-7 flex w-[90%] items-center justify-between gap-2 lg:hidden">
              <div className="relative h-[2px] w-full bg-gray">
                <div
                  className="absolute left-0 top-0 h-full bg-black transition-all"
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                ></div>
              </div>
              <span className="flex gap-1 text-[11px]">
                <span>{currentPage}</span>
                <span className="text-bordercolor"> / </span>
                <span className="text-bordercolor">{totalPages}</span>
              </span>
            </div>
            {/* 더보기 */}
            <div className="m-auto block h-[30px] w-[90%] rounded-full border border-black lg:h-[45px] lg:max-w-[240px]">
              <Link
                className="flex h-full w-full items-center justify-center gap-1 text-xs lg:text-base"
                href="/"
              >
                더많은 <strong>여행지</strong> 보러가기
                <FontAwesomeIcon className="text-sm" icon={faAngleRight} />
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
}

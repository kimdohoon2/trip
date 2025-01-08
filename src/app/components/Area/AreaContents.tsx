'use client';

import { useState, useMemo, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import { Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import Image from 'next/image';
import { AreaContentsProps } from '@/app/type/ItemType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Common/modal';
import { categoryMap } from '@/app/constant/SlideConstant';
import Link from 'next/link';

export default function AreaContents({
  tourData,
  loading,
  error,
  selectedArea,
}: AreaContentsProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [heartStates, setHeartStates] = useState<{ [key: string]: boolean }>({});
  const [category, setCategory] = useState('음식점 🍽️');
  const [currentPage, setCurrentPage] = useState(1);
  const slidesPerView = 3;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>(undefined);
  const [windowSize, setWindowSize] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

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

  // 지역 선택 시에도 currentPage 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [tourData]); // tourData가 변경될 때마다 초기화

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

    if (loading || error) {
      return { filteredTourData: [], availableCategories: [] };
    }

    // 화면 크기에 따라 데이터 슬라이싱
    const maxItems = windowSize >= 1024 ? 8 : 10;
    return {
      filteredTourData: filteredData.slice(0, maxItems), // 슬라이싱된 데이터 반환
      availableCategories,
    };

    // return { filteredTourData: filteredData, categories, availableCategories };
  }, [loading, error, tourData, category, windowSize]);
  console.log('전체 데이터:', tourData);
  console.log('필터링된 데이터:', filteredTourData);
  // 하트 상태를 토글하는 함수
  const toggleHeart = (contentid: string) => {
    const isLiked = heartStates[contentid];

    if (isLiked) {
      setModalMessage('좋아요를 취소하시겠습니까?');
      setOnConfirm(() => () => {
        setHeartStates((prevStates) => ({
          ...prevStates,
          [contentid]: false,
        }));
        setIsModalOpen(false);
      });
      setIsModalOpen(true);
    } else {
      setHeartStates((prevStates) => ({
        ...prevStates,
        [contentid]: true,
      }));
      setModalMessage('좋아요를 클릭하셨습니다!');
      setOnConfirm(undefined);
      setIsModalOpen(true);
    }
  };

  // 페이지네이션 상태 업데이트
  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentPage(swiper.realIndex + 1);
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredTourData.length / slidesPerView);

  // 로딩화면
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-lg text-blue-500">
        로딩 중...
      </div>
    );
  }

  // 에러화면
  if (error) {
    return <div className="text-center text-red-600">오류: {error}</div>;
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onConfirm}
      />
      <section className="1xl:max-w-[1000px] 1xl:m-auto 1xl:pl-0 1xl:pr-0 relative -top-5 rounded-tl-[20px] bg-white pb-10 pl-4 pt-5 lg:-top-0 lg:px-6 lg:pb-12 lg:pt-12">
        <h2 className="text-lg lg:text-2xl">{regionText}</h2>
        <div className="align-center relative flex items-center">
          <span className="mr-2 text-sm text-bgopacity lg:text-2xl">다양한</span>
          <button onClick={() => setVisible(!visible)}>
            <div className="1xl:w-[195px] z-20 flex w-[120px] justify-between border-b border-black bg-white text-lg font-bold lg:w-[170px] lg:text-3xl">
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

'use client';

import { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import { Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import Image from 'next/image';
import { TourListApi } from '@/app/api/tourApi';
import { AreaItem } from '@/app/type/ItemType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Common/modal';

export default function AreaContents() {
  const [tourData, setTourData] = useState<AreaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [heartStates, setHeartStates] = useState<{ [key: string]: boolean }>({});
  const [category, setCategory] = useState('음식점 🍽️');
  const [currentPage, setCurrentPage] = useState(1);
  const slidesPerView = 3;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>(undefined);

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TourListApi();
        if (Array.isArray(data)) {
          setTourData(data); // 데이터가 배열이면 상태로 설정
        } else {
          throw new Error('데이터 형식이 올바르지 않습니다.');
        }
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
          console.error('데이터 로딩 에러:', err);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // useMemo를 활용해 불필요한 렌더링방지
  const { filteredTourData, availableCategories } = useMemo(() => {
    const categories = ['음식점 🍽️', '관광지 🏛️', '문화시설 🎨'];
    const availableCategories = categories.filter((item) => item !== category);

    const categoryMap: { [key: string]: string } = {
      '음식점 🍽️': '39',
      '관광지 🏛️': '12',
      '문화시설 🎨': '14',
    };

    const categoryId = categoryMap[category];
    const filteredData = tourData
      .filter((item) => {
        return categoryId ? item.contenttypeid === categoryId : true;
      })
      .map((item) => ({
        ...item,
        addr1: item.addr1.split(' ').slice(0, 2).join(' '), // '서울특별시 ○○구'로 축약
      }))
      .slice(0, 10); // 필터링된 데이터에서 10개로 제한

    // totalPages가 0일 경우 currentPage가 1로 설정되도록
    if (filteredData.length === 0) {
      setCurrentPage(1); // currentPage를 1로 설정
    } else if (currentPage === 0) {
      setCurrentPage(1); // currentPage가 0이면 1로 설정
    }
    if (loading || error) {
      return { filteredTourData: [], availableCategories: [] };
    }

    return { filteredTourData: filteredData, categories, availableCategories };
  }, [loading, error, tourData, category, currentPage]);

  // 하트 상태를 토글하는 함수
  const toggleHeart = (contentid: string) => {
    const isLiked = heartStates[contentid];

    if (isLiked) {
      // 좋아요 취소 확인 모달 열기
      setModalMessage('좋아요를 취소하시겠습니까?');
      setOnConfirm(() => () => {
        setHeartStates((prevStates) => ({
          ...prevStates,
          [contentid]: false, // 좋아요 취소
        }));
        setIsModalOpen(false); // 모달 닫기
      });
      setIsModalOpen(true); // 모달 열기
    } else {
      // 좋아요 설정
      setHeartStates((prevStates) => ({
        ...prevStates,
        [contentid]: true, // 좋아요 설정
      }));
      setModalMessage('좋아요를 클릭하셨습니다!');
      setOnConfirm(undefined); // 확인 동작 필요 없음
      setIsModalOpen(true); // 모달 열기
    }
  };

  // 페이지네이션 상태 업데이트
  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentPage(swiper.realIndex + 1); // 현재 페이지 인덱스를 1-based로 설정
  };

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

  // 데이터가 없을 경우 화면
  if (filteredTourData.length === 0) {
    return (
      <div className="text-gray-500 flex h-full items-center justify-center text-lg">
        데이터가 없습니다
      </div>
    );
  }
  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredTourData.length / slidesPerView);
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onConfirm}
      />
      <section className="relative -top-5 rounded-tl-[20px] bg-white pl-4 pt-[20px]">
        <div>
          <h2 className="text-lg">대한민국 구석구석,</h2>
          <div className="flex">
            <button
              onClick={() => setVisible(!visible)}
              className="align-center relative flex items-center"
            >
              <div className="z-20 flex w-[120px] justify-between border-b border-black bg-white text-lg">
                {category}
                <span>
                  <FontAwesomeIcon
                    className={`z-20 text-[14px] text-[#6d6d6d] transition-transform duration-300 lg:text-[24px] lg:text-[black] ${visible ? 'rotate-180' : ''}`}
                    icon={faAngleDown}
                  />
                </span>
              </div>
              <ul
                aria-hidden={!visible}
                className={`absolute top-[29px] z-10 w-full max-w-[120px] ${visible ? 'block' : 'hidden'}`}
              >
                {availableCategories.map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setCategory(item);
                      setVisible(false);
                    }}
                    className="flex w-full justify-between border-b border-black bg-white text-lg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <span className="ml-2 text-[14px] text-black">알려드릴게요!</span>
            </button>
          </div>
          <Swiper
            slidesPerView={2.5}
            grid={{
              rows: 2,
            }}
            modules={[Grid]}
            onSlideChange={handleSlideChange} // 슬라이드 변경 시 페이지네이션 업데이트
            className="mt-[20px] h-full w-full"
          >
            {filteredTourData.map((item) => (
              <SwiperSlide
                key={item.title}
                className="flex w-full max-w-[300px] flex-row items-center justify-center pb-[15px] pr-[15px]"
              >
                <div>
                  <div className="relative aspect-[4/3] h-[34.38vw] w-full overflow-hidden rounded-md">
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
                      className="absolute right-2 top-2 h-5 w-5 cursor-pointer rounded-full bg-white"
                    >
                      <FontAwesomeIcon
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-[14px] ${heartStates[item.contentid] ? 'text-[#ff6b6b]' : 'text-black opacity-[50%]'} transition-transform duration-300`}
                        icon={faHeart}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-center text-[13px] font-bold">{item.title}</p>
                  <p className="text-center text-[11px] text-bordercolor">{item.addr1}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="m-auto flex w-[90%] items-center justify-between gap-2">
          <div className="relative h-[2px] w-full bg-gray">
            <div
              className="absolute left-0 top-0 h-full bg-black transition-all"
              style={{ width: `${(currentPage / totalPages) * 100}%` }} // 프로그레스 바 길이 조정
            ></div>
          </div>
          <span className="flex gap-1 text-[11px]">
            <span>{currentPage}</span>
            <span className="text-bordercolor"> / </span>
            <span className="text-bordercolor">{totalPages}</span>
          </span>
        </div>
      </section>
    </>
  );
}

'use client';

import AreaSlide from './AreaSlide';
import { useInteractionStore } from '@/app/stores/useInteractionStore';
import { useLocationStore } from '@/app/stores/useLocationStore';

export default function AreaHeader() {
  const { myLocationButton, setMyLocationButton } = useInteractionStore();
  const { setUserLocation } = useLocationStore();

  // 위치 클릭 핸들러
  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert('위치 정보를 사용할 수 없는 브라우저입니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        // 위치 정보 가져오고 버튼 상태를 토글하여 이동시키기
        setMyLocationButton(!myLocationButton); // 상태를 반전시켜서 왼쪽/오른쪽으로 번갈아 이동
      },
      (error) => {
        console.error('위치 정보 오류:', error);
        alert('위치 정보를 가져오는 중 문제가 발생했습니다.');
      }
    );
  };

  return (
    <div className="bg-areabg pb-8 pt-3 lg:pb-0 lg:pt-28 1xl:pt-20">
      <div className="relative right-5 mb-2 flex items-center justify-end lg:right-7 lg:hidden 1xl:right-16">
        <label className="mx-[5px] text-[11px] text-black lg:text-base">내위치</label>
        <button
          className={`relative h-[13px] w-[22px] rounded-3xl lg:h-[15px] lg:w-[30px] ${myLocationButton ? 'bg-black' : 'bg-gray'}`}
          onClick={handleLocationClick} // 클릭 시 위치 정보 요청
        >
          <div
            className={`absolute top-1/2 h-[13px] w-[13px] -translate-y-1/2 transform rounded-[50%] bg-white transition-all duration-100 lg:h-[15px] lg:w-[15px] ${
              myLocationButton ? 'translate-x-[100%]' : 'translate-x-0'
            }`} // myLocationButton 상태에 따라 이동
          ></div>
        </button>
      </div>
      <AreaSlide />
    </div>
  );
}

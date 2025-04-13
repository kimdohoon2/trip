import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';

interface MainSlideControlsProps {
  showNavigation: boolean;
  isPlaying: boolean;
  handlePlayPause: () => void;
}

const MainSlideControls: React.FC<MainSlideControlsProps> = ({
  showNavigation,
  isPlaying,
  handlePlayPause,
}) => {
  return (
    <div className="lg:flex lg:w-[12.5rem] lg:items-center lg:justify-between">
      {showNavigation && (
        <div
          className="swiper-button-prev cursor-pointer text-lg"
          aria-label="이전 슬라이드로 이동"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      )}
      <button
        className="cursor-pointer p-3"
        onClick={handlePlayPause}
        aria-label={isPlaying ? '슬라이드 일시정지' : '슬라이드 재생'}
      >
        {isPlaying ? (
          <div className="text-black">
            <FontAwesomeIcon icon={faPause} />
          </div>
        ) : (
          <div className="text-black">
            <FontAwesomeIcon icon={faPlay} />
          </div>
        )}
      </button>
      {showNavigation && (
        <div
          className="swiper-button-next cursor-pointer text-lg"
          aria-label="다음 슬라이드로 이동"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      )}
    </div>
  );
};

export default MainSlideControls;

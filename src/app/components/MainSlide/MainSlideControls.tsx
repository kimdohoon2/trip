import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

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
    <div className="lg:flex lg:w-[200px] lg:items-center lg:justify-between">
      {showNavigation && (
        <div className="swiper-button-prev cursor-pointer text-[18px]">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      )}
      <div className="cursor-pointer p-3" onClick={handlePlayPause}>
        {isPlaying ? (
          <div className="text-black">
            <FontAwesomeIcon icon={faPause} />
          </div>
        ) : (
          <div className="text-black">
            <FontAwesomeIcon icon={faPlay} />
          </div>
        )}
      </div>
      {showNavigation && (
        <div className="swiper-button-next cursor-pointer text-[18px]">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      )}
    </div>
  );
};

export default MainSlideControls;

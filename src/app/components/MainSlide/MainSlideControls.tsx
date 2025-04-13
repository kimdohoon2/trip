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
        <div className="swiper-button-prev cursor-pointer text-lg">
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
        <div className="swiper-button-next cursor-pointer text-lg">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      )}
    </div>
  );
};

export default MainSlideControls;

import React from 'react';

interface MainProgressBarProps {
  progressBarRef: React.RefObject<HTMLDivElement>;
}

const MainProgress: React.FC<MainProgressBarProps> = ({ progressBarRef }) => {
  return (
    <div className="h-[2px] w-full max-w-[14.0625rem] bg-gray md:max-w-none">
      <div
        ref={progressBarRef}
        className="z-12 relative h-[2px] w-full origin-left scale-x-0 transform bg-black"
      ></div>
    </div>
  );
};

export default MainProgress;

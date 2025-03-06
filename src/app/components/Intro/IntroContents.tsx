'use client';

import { useState, useEffect } from 'react';
import CircleUp from '@/app/components/Intro/CircleUp';
import CircleDown from '@/app/components/Intro/CircleDown';
import LeftTopBar from '@/app/components/Intro/LeftTopBar';
import LeftBottomBar from '@/app/components/Intro/LeftBottomBar';
import RightBottomBar from '@/app/components/Intro/RightBottomBar';
import RightTopBar from '@/app/components/Intro/RightTopBar';
import LogoIcon from '@/app/components/Header/LogoIcon';
import { SESSION_STORAGE_KEYS } from '@/app/constant/sessionStorageKeys';

interface IntroContentsProps {
  onComplete: () => void;
}

export default function IntroContents({ onComplete }: IntroContentsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [animationState, setAnimationState] = useState('initial');

  useEffect(() => {
    setIsMounted(true);
    const storedHasSeenIntro = sessionStorage.getItem(SESSION_STORAGE_KEYS.HAS_SEEN_INTRO);
    setHasSeenIntro(storedHasSeenIntro === 'true');
  }, []);

  useEffect(() => {
    if (isMounted && !hasSeenIntro) {
      const startTimer = setTimeout(() => {
        setAnimationState('in');
      }, 100);

      const endTimer = setTimeout(() => {
        setAnimationState('out');
      }, 5000);

      const completeTimer = setTimeout(() => {
        setHasSeenIntro(true);
        sessionStorage.setItem(SESSION_STORAGE_KEYS.HAS_SEEN_INTRO, 'true');
      }, 6000);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(endTimer);
        clearTimeout(completeTimer);
      };
    } else if (hasSeenIntro) {
      onComplete();
    }
  }, [isMounted, hasSeenIntro, onComplete]);

  const getClipPathClass = () => {
    switch (animationState) {
      case 'initial':
        return 'clip-circle-initial';
      case 'in':
        return 'clip-circle-in';
      case 'out':
        return 'clip-circle-out';
      default:
        return '';
    }
  };

  if (!isMounted || hasSeenIntro) {
    return null;
  }

  return (
    <div className={`fixed left-0 top-0 z-50 h-[100vh] w-full bg-white ${getClipPathClass()}`}>
      <div className="relative top-1/2 mx-auto h-[240px] w-[360px] -translate-y-1/2 lg:h-[300px] lg:w-[400px]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[120px] w-[120px] rounded-full lg:h-[300px] lg:w-[300px]">
            <div className="absolute left-0 top-0 h-[90px] w-[120px] lg:h-[225px] lg:w-[300px]">
              <CircleUp />
            </div>
            <div className="absolute bottom-0 right-0 h-[90px] w-[120px] lg:h-[225px] lg:w-[300px]">
              <CircleDown />
            </div>
          </div>
        </div>
        <div className="absolute left-1/4 top-1/4 flex h-[60px] w-[40px] -translate-x-1/2 -translate-y-1/2 rotate-[45deg] gap-1 lg:left-0 lg:top-0 lg:h-[100px] lg:w-[80px]">
          <LeftTopBar />
        </div>
        <div className="absolute right-1/4 top-1/4 flex h-[60px] w-[40px] -translate-y-1/2 translate-x-1/2 rotate-[-45deg] gap-1 lg:right-0 lg:top-0 lg:h-[100px] lg:w-[80px]">
          <RightTopBar />
        </div>
        <div className="absolute bottom-1/4 left-1/4 flex h-[60px] w-[40px] -translate-x-1/2 translate-y-1/2 rotate-[-45deg] gap-1 lg:bottom-0 lg:left-0 lg:h-[100px] lg:w-[80px]">
          <LeftBottomBar />
        </div>
        <div className="absolute bottom-1/4 right-1/4 flex h-[60px] w-[40px] translate-x-1/2 translate-y-1/2 rotate-[45deg] gap-1 lg:bottom-0 lg:right-0 lg:h-[100px] lg:w-[80px]">
          <RightBottomBar />
        </div>
      </div>
      <div className="absolute left-1/2 top-[70%] h-10 w-[10rem] -translate-x-1/2 -translate-y-1/2 lg:top-1/2 lg:w-60">
        <LogoIcon className="h-full w-full" />
      </div>
    </div>
  );
}

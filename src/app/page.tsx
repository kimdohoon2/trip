'use client';

import { useState } from 'react';
import MainSlide from '@/app/components/Slide/MainSlide';
import AccomdationContents from '@/app/components/Accomdation/AccomdationContents';
import EventContents from '@/app/components/Event/EventContents';
import IntroContents from '@/app/components/Intro/IntroContents';

export default function HomePage() {
  const [showMainContent, setShowMainContent] = useState(false);

  const handleIntroComplete = () => {
    setShowMainContent(true);
  };

  return (
    <>
      <IntroContents onComplete={handleIntroComplete} />
      {showMainContent && (
        <>
          <MainSlide />
          <AccomdationContents />
          <EventContents />
        </>
      )}
    </>
  );
}

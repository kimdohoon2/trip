'use client';

import { useState } from 'react';
import MainSlide from '@/app/components/MainSlide/MainSlide';
import AccomdationContents from '@/app/components/Accomdation/AccomdationContents';
import EventContents from '@/app/components/Event/EventContents';
import IntroContents from '@/app/components/Intro/IntroContents';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/FooterContents';

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
          <Header />
          <MainSlide />
          <AccomdationContents />
          <EventContents />
          <Footer />
        </>
      )}
    </>
  );
}

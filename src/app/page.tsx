'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Header />
          <MainSlide />
          <AccomdationContents />
          <EventContents />
          <Footer />
        </motion.div>
      )}
    </>
  );
}

import MainSlide from '@/app/components/Slide/MainSlide';
import AccomdationContents from '@/app/components/Accomdation/AccomdationContents';
import EventContents from '@/app/components/Event/EventContents';
import IntroContents from '@/app/components/Intro/IntroContents';

export default function HomePage() {
  return (
    <>
      <IntroContents />
      <MainSlide />
      <AccomdationContents />
      <EventContents />
    </>
  );
}

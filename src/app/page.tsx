import MainSlide from '@/app/components/MainSlide/MainSlide';
import AccomdationContents from '@/app/components/Accomdation/AccomdationContents';
import EventContents from '@/app/components/Event/EventContents';

export default function HomePage() {
  return (
    <>
      <MainSlide />
      <AccomdationContents />
      <EventContents />
    </>
  );
}

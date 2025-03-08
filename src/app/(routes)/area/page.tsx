import AreaHeader from '@/app/components/Area/AreaHeader';
import AreaContents from '@/app/components/Area/AreaContents/AreaContents';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/FooterContents';

export default function AreaPage() {
  return (
    <>
      <Header />
      <AreaHeader />
      <AreaContents />
      <Footer />
    </>
  );
}

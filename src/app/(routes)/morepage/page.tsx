import MoreHeader from '@/app/components/MorePage/MoreHeader';
import MoreContents from '@/app/components/MorePage/MoreContents';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/FooterContents';

export default function MorePage() {
  return (
    <>
      <Header />
      <MoreHeader />
      <MoreContents />
      <Footer />
    </>
  );
}

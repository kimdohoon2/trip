import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/FooterContents';

const NotFound: React.FC = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 flex min-h-screen flex-col items-center justify-center 1xl:pt-32">
        <div className="w-[7.5rem] lg:w-[18.75rem] 1xl:w-[31.25rem]">
          <Image
            className="h-full w-full object-cover"
            src="/error/404.png"
            alt="404-error"
            width={500}
            height={500}
          ></Image>
        </div>
        <div className="text-center">
          <p className="mt-4 text-xl text-black">페이지를 찾을 수 없습니다.</p>
          <Link href="/" className="mt-6 inline-block rounded bg-black px-4 py-2 text-white">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;

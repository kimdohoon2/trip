import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/app/components/Header/Header';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Providers from './providers';
config.autoAddCss = false;

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: '대한민국 구석구석',
  description: '대한민국 구석구석 여행 정보',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 쿠키나 로컬 스토리지로 테마 관리 가능
  const theme = typeof window !== 'undefined' && localStorage.getItem('theme');
  return (
    <html lang="ko" className={theme === 'dark' ? 'dark' : ''}>
      <body className={`${pretendard.className} antialiased`}>
        <Providers>
          <Header />
          <main className="mt-[140px] md:mt-[140px] lg:mt-0">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

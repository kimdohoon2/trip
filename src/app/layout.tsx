import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/app/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Providers from '@/app/providers/providers';
config.autoAddCss = false;

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: '대한민국 구석구석',
  description:
    '대한민국 구석구석의 핵심 기능을 참고하여 개발하였으며, 일부는 원본과 유사하게 구현하고, 일부는 사용자 경험을 개선하여 차별화된 기능을 추가하였습니다. 국내 여행 정보를 효과적으로 탐색할 수 있는 서비스입니다.',
  keywords: '대한민국 구석구석, 국내 여행, 관광 정보, 여행 플랫폼, 웹 개발',
  openGraph: {
    siteName: '대한민국 구석구석',
    title: '대한민국 구석구석',
    type: 'website',
    description:
      '대한민국 구석구석의 핵심 기능을 참고하여 개발하였으며, 일부는 원본과 유사하게 구현하고, 일부는 사용자 경험을 개선하여 차별화된 기능을 추가하였습니다. 국내 여행 정보를 효과적으로 탐색할 수 있는 서비스입니다.',
    images: [
      {
        url: 'https://koreantrip.vercel.app/meta/sum-meta-img.png',
        alt: '대한민국 구석구석 이미지',
      },
    ],
    url: 'https://koreantrip.vercel.app/',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = typeof window !== 'undefined' && localStorage.getItem('theme');
  return (
    <html lang="ko" className={theme === 'dark' ? 'dark' : ''}>
      <body className={`${pretendard.className} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <main className="mb-16 mt-[140px] flex-1 md:mt-[140px] lg:mb-0 lg:mt-0">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

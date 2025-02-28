import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/app/styles/globals.css';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/FooterContents';
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
  description: '대한민국 구석구석 여행 정보',
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
            <Header />
            <main className="mt-[140px] flex-1 md:mt-[140px] lg:mt-0">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

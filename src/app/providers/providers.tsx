'use client';

import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [, setTheme] = useState<string>('');

  // 클라이언트 사이드에서만 테마 정보 로드
  useEffect(() => {
    const storedTheme = sessionStorage.getItem('theme');
    setTheme(storedTheme || '');

    // HTML 요소의 클래스 설정
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

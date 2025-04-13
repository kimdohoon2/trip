import { create } from 'zustand';
import { useEffect } from 'react';

// UI 상태 타입
export interface UIStoreState {
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  slidesPerView: number;
  setSlidesPerView: (count: number) => void;
  windowSize: number;
  setWindowSize: (size: number) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const useUIStore = create<UIStoreState>((set) => ({
  selectedArea: '전국',
  selectedCategory: '여행지 🌍',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedArea: (area) => set({ selectedArea: area }),
  visible: false,
  setVisible: (visible) => set({ visible }),
  slidesPerView: 3,
  setSlidesPerView: (count) => set({ slidesPerView: count }),
  windowSize: 0,
  setWindowSize: (size) => set({ windowSize: size }),
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
}));

// 윈도우 크기를 초기화 및 변경 감지를 위한 훅
export const useWindowSizeEffect = () => {
  const { setWindowSize } = useUIStore();

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    const updateWindowSize = () => {
      setWindowSize(window.innerWidth);
    };

    // 초기 설정
    updateWindowSize();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', updateWindowSize);

    // 클린업 함수
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, [setWindowSize]);
};

import { create } from 'zustand';

// UI 상태 타입
export interface UIStoreState {
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  slidesPerView: number;
  setSlidesPerView: (count: number) => void;
  windowSize: number;
  setWindowSize: (size: number) => void;
}

export const useUIStore = create<UIStoreState>((set) => ({
  selectedArea: '전국',
  setSelectedArea: (area) => set({ selectedArea: area }),
  visible: false,
  setVisible: (visible) => set({ visible }),
  slidesPerView: 3,
  setSlidesPerView: (count) => set({ slidesPerView: count }),
  windowSize: typeof window !== 'undefined' ? window.innerWidth : 0,
  setWindowSize: (size) => set({ windowSize: size }),
}));

import { create } from 'zustand';

export interface AreaSlideProps {
  selectedArea: string;
  setSelectedArea: (area?: string) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  heartStates: { [key: string]: boolean };
  setHeartStates: (
    setter: (prevStates: { [key: string]: boolean }) => { [key: string]: boolean }
  ) => void;
  category: string;
  setCategory: (category: string) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  slidesPerView: number;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalMessage: string;
  setModalMessage: (message: string) => void;
  onConfirm: (() => void) | undefined;
  setOnConfirm: (onConfirm: (() => void) | undefined) => void;
  windowSize: number;
  setWindowSize: (size: number) => void;
}

export const useAreaStore = create<AreaSlideProps>((set) => ({
  selectedArea: '전국',
  setSelectedArea: (area) => set({ selectedArea: area }),
  visible: false,
  setVisible: (visible) => set({ visible }),
  heartStates: {},
  setHeartStates: (setter) => set((state) => ({ heartStates: setter(state.heartStates) })),
  category: '음식점 🍽️',
  setCategory: (category) => set({ category }),
  currentPage: 1,
  setCurrentPage: (currentPage) => set({ currentPage }),
  slidesPerView: 3,
  isModalOpen: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  modalMessage: '',
  setModalMessage: (message) => set({ modalMessage: message }),
  onConfirm: undefined,
  setOnConfirm: (onConfirm) => set({ onConfirm }),
  windowSize: typeof window !== 'undefined' ? window.innerWidth : 0,
  setWindowSize: (size) => set({ windowSize: size }),
}));

import { create } from 'zustand';

// 사용자 상호작용 상태 타입
export interface InteractionStoreState {
  heartStates: { [key: string]: boolean };
  setHeartStates: (
    setter: (prevStates: { [key: string]: boolean }) => { [key: string]: boolean }
  ) => void;
  category: string;
  setCategory: (category: string) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  myLocationButton: boolean;
  setMyLocationButton: (value: boolean) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useInteractionStore = create<InteractionStoreState>((set) => ({
  heartStates: {},
  setHeartStates: (setter) =>
    set((state) => ({
      heartStates: setter(state.heartStates),
    })),
  category: '여행지 🌍',
  setCategory: (category) => set({ category }),
  currentPage: 1,
  setCurrentPage: (currentPage) => set({ currentPage }),
  myLocationButton: false,
  setMyLocationButton: (value) => set({ myLocationButton: value }),
  keyword: '',
  setKeyword: (keyword) => set({ keyword }),
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

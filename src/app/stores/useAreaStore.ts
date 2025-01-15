import { create } from 'zustand';
import { AreaItem, UserLocation } from '../types/ItemType';

// Zustand 상태 타입
export interface AreaStoreState {
  selectedArea: string;
  setSelectedArea: (area: string) => void;
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
  windowSize: number;
  setWindowSize: (size: number) => void;
  userLocation: UserLocation;
  setUserLocation: (location: UserLocation) => void;
  locationData: AreaItem[];
  setLocationData: (data: AreaItem[]) => void;
}

export const useAreaStore = create<AreaStoreState>((set) => ({
  selectedArea: '전국',
  setSelectedArea: (area) => set({ selectedArea: area }),
  visible: false,
  setVisible: (visible) => set({ visible }),
  heartStates: {},
  setHeartStates: (setter) =>
    set((state) => ({
      heartStates: setter(state.heartStates),
    })),
  category: '음식점 🍽️',
  setCategory: (category) => set({ category }),
  currentPage: 1,
  setCurrentPage: (currentPage) => set({ currentPage }),
  slidesPerView: 3,
  windowSize: typeof window !== 'undefined' ? window.innerWidth : 0,
  setWindowSize: (size) => set({ windowSize: size }),
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
  locationData: [],
  setLocationData: (data: AreaItem[]) => set({ locationData: data }),
}));

import { create } from 'zustand';
import { AreaItem, UserLocation } from '@/app/types/ItemType';

// 위치 데이터 상태 타입
export interface LocationStoreState {
  userLocation: UserLocation | null;
  setUserLocation: (location: UserLocation) => void;
  locationData: AreaItem[];
  setLocationData: (data: AreaItem[]) => void;
}

export const useLocationStore = create<LocationStoreState>((set) => ({
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
  locationData: [],
  setLocationData: (data) => set({ locationData: data }),
}));

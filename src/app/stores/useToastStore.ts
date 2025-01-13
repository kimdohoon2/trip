import { create } from 'zustand';

type ToastState = {
  message: string | null;
  type: 'success' | 'error'; // 알림 유형
  setMessage: (message: string, type?: 'success' | 'error') => void;
  clearMessage: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  type: 'success', // 기본값
  setMessage: (message, type = 'success') => set({ message, type }),
  clearMessage: () => set({ message: null, type: 'success' }),
}));

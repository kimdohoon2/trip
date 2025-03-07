import { create } from 'zustand';
import { Swiper as SwiperClass } from 'swiper';

interface GalleryStore {
  galleryTopSwiper: SwiperClass | null;
  setGalleryTopSwiper: (swiper: SwiperClass | null) => void;
  galleryTextSwiper: SwiperClass | null;
  setGalleryTextSwiper: (swiper: SwiperClass | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  showNavigation: boolean;
  setShowNavigation: (show: boolean) => void;
}

export const useMainSlideStore = create<GalleryStore>((set) => ({
  galleryTopSwiper: null,
  setGalleryTopSwiper: (swiper) => set({ galleryTopSwiper: swiper }),
  galleryTextSwiper: null,
  setGalleryTextSwiper: (swiper) => set({ galleryTextSwiper: swiper }),
  isPlaying: true,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  currentSlide: 1,
  setCurrentSlide: (slide) => set({ currentSlide: slide }),
  bgColor: 'bg-custompink',
  setBgColor: (color) => set({ bgColor: color }),
  showNavigation: false,
  setShowNavigation: (show) => set({ showNavigation: show }),
}));

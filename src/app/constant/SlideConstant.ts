import { MainSlideType, AreaSlideType } from '@/app/types/ItemType';

export const MainSlideInfo: MainSlideType[] = [
  {
    image: '/main/main1.png',
    title: '가볼래-터 도착❄',
    description: '낭만여행 적립',
    description2: '겨울 여행지 속으로',
  },
  {
    image: '/main/main2.png',
    title: '자연 그대로의 매력🌲',
    description: '강원도 양구 감성 충전 코스.zip',
  },
  {
    image: '/main/main3.png',
    title: ' 한옥 스테이와 함께,',
    description: '논산에서 만나는 여유와 쉼',
  },
];

export const AreaHeaderSlide: AreaSlideType[] = [
  {
    image: '/area/1.png',
    title: '전국',
  },
  {
    image: '/area/2.png',
    title: '서울',
  },
  {
    image: '/area/3.png',
    title: '인천',
  },
  {
    image: '/area/4.png',
    title: '대전',
  },
  {
    image: '/area/5.png',
    title: '대구',
  },
  {
    image: '/area/6.png',
    title: '광주',
  },
  {
    image: '/area/7.png',
    title: '부산',
  },
  {
    image: '/area/8.png',
    title: '울산',
  },
  {
    image: '/area/9.png',
    title: '경기',
  },
  {
    image: '/area/10.png',
    title: '강원',
  },
  {
    image: '/area/11.png',
    title: '충북',
  },
  {
    image: '/area/12.png',
    title: '충남',
  },
  {
    image: '/area/13.png',
    title: '경북',
  },
  {
    image: '/area/14.png',
    title: '경남',
  },
  {
    image: '/area/15.png',
    title: '전북',
  },
  {
    image: '/area/16.png',
    title: '전남',
  },
  {
    image: '/area/17.png',
    title: '제주',
  },
  {
    image: '/area/18.png',
    title: '세종',
  },
];
export const categories = ['여행지 🌍', '맛집 🍴', '숙소 🏨'];

export const categoryMap: { [key: string]: string } = {
  '여행지 🌍': '12',
  '맛집 🍴': '39',
  '숙소 🏨': '32',
};

// tour api 관련 상수값
export const areaCodeMap: { [key: string]: string } = {
  전국: '',
  서울: '1',
  인천: '2',
  대전: '3',
  대구: '4',
  광주: '5',
  부산: '6',
  울산: '7',
  세종: '8',
  경기: '31',
  강원: '32',
  충북: '33',
  충남: '34',
  경북: '35',
  경남: '36',
  전북: '37',
  전남: '38',
  제주: '39',
};

export interface AreaItem {
  title: string;
  addr1: string;
  mapx: string;
  mapy: string;
  firstimage: string;
  firstimage2: string;
  contenttypeid: string;
  contentid: string;
  areaCode?: string;
  dist?: string;
  radius?: string;
  areacode?: string;
}

export interface StayItem {
  title: string;
  addr1: string;
  mapx: string;
  mapy: string;
  firstimage: string;
  firstimage2: string;
  contentid: string;
  contenttypeid: string;
  areaCode?: string; // 지역 코드
}
export interface EventItem {
  title: string;
  addr1: string;
  addr2?: string;
  firstimage: string;
  firstimage2: string;
  contenttypeid: string;
  contentid: string;
  tel?: string;
  eventstartdate: string;
  eventenddate: string;
  mapx?: string;
  mapy?: string;
  areacode?: string;
  sigungucode?: string;
  // 새로 추가된 필드들
  progresstype?: string; // 1: 진행중, 2: 진행예정, 3: 진행완료
  festivaltype?: string; // 행사 유형
  cat1?: string;
  cat2?: string;
  cat3?: string;
}

export interface LocationApiResponse {
  items: AreaItem[];
  areaCode: string;
}

export interface SearchApiResponse {
  title: string;
  addr1: string;
  firstimage: string;
  firstimage2: string;
  contenttypeid: string;
  contentid: string;
  tel: string;
}

export interface MainSlideType {
  title: string;
  image: string;
  description: string;
  description2?: string;
}
export interface AreaSlideType {
  title: string;
  image: string;
}

// 사용자 위치 타입
export type UserLocation = {
  latitude: number;
  longitude: number;
} | null;

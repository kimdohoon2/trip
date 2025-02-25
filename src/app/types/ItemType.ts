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
  benikia?: string; // 베니케아 여부
  hanok?: string; // 한옥 여부
  goodstay?: string; // 굿스테이 여부
  areaCode?: string; // 지역 코드
}
export interface EventItem {
  title: string;
  addr1: string;
  firstimage: string;
  firstimage2: string;
  contentid: string;
  contenttypeid: string;
  tel: string;
  areaCode?: string; // 지역 코드
  eventstartdate: string;
  eventenddate: string;
}

export interface LocationApiResponse {
  items: AreaItem[];
  areaCode: string;
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

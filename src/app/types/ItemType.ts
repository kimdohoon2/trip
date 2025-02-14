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
export interface AccomdationType {
  title: string;
  image: string;
  description: string;
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

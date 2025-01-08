export interface AreaItem {
  title: string; // 제목
  addr1: string; // 주소 (첫 번째 줄)
  mapx: string; // 지도 x좌표
  mapy: string; // 지도 y좌표
  firstimage: string; // 첫 번째 이미지 URL
  firstimage2: string; // 썸네일 이미지 URL
  contenttypeid: string; // 컨텐츠 타입 ID
  contentid: string; // 컨텐츠 ID
  areaCode: string; // 지역 코드
}

export interface AreaContentsProps {
  tourData: AreaItem[];
  loading: boolean;
  error: string | null;
  selectedArea: string;
}

export interface AreaSlideProps {
  selectedArea: string;
  setSelectedArea: (area: string) => void;
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

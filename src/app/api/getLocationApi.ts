import axios from 'axios';
import xml2js from 'xml2js';
import { AreaItem } from '@/app/types/ItemType';
import getUserLocation from '@/app/utils/getUserLocation';
import { API_URLS, TOUR_API_KEY } from '@/app/constant/apiConstants';

// 위치 기반 관광 정보 조회
export const getLocationApi = async (): Promise<{ items: AreaItem[]; areaCode: string }> => {
  try {
    // 사용자 위치 가져오기
    const { latitude, longitude } = await getUserLocation();
    const params = {
      MobileApp: 'AppTest',
      MobileOS: 'ETC',
      pageNo: 1,
      mapX: longitude,
      mapY: latitude,
      radius: 5000,
      numOfRows: 100,
      arrange: 'R',
      listYN: 'Y',
    };

    const response = await axios.get(`${API_URLS.LOCATION_BASED}?serviceKey=${TOUR_API_KEY}`, {
      params,
    });

    // XML 데이터를 JSON으로 변환
    const parsedData = await xml2js.parseStringPromise(response.data, { explicitArray: false });

    // API 응답에서 items가 없거나 잘못된 경우 처리
    const items = parsedData.response?.body?.items?.item || [];
    if (!Array.isArray(items)) {
      console.error('API 응답에 유효한 items가 없습니다.');
      return { items: [], areaCode: '' };
    }

    // 필요한 값만 추출
    const formattedItems: AreaItem[] = items.map((item: AreaItem) => ({
      title: item.title,
      addr1: item.addr1 || '',
      mapx: item.mapx,
      mapy: item.mapy,
      dist: item.dist,
      firstimage: item.firstimage || '',
      firstimage2: item.firstimage2 || '',
      contenttypeid: item.contenttypeid || '',
      contentid: item.contentid || '',
      areaCode: item.areacode?.toString(),
    }));

    return { items: formattedItems, areaCode: formattedItems[0]?.areaCode || '' };
  } catch (error) {
    console.error('API 오류:', error);
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

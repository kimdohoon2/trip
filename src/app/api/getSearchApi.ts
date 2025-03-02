import axios from 'axios';
import xml2js from 'xml2js';
import { SearchApiResponse } from '@/app/types/ItemType';
import { API_URLS, TOUR_API_KEY } from '@/app/constant/apiConstants';

// 검색 정보 조회
export const getSearchApi = async (
  keyword: string,
  numOfRows: number,
  contentTypeId: string | null
): Promise<SearchApiResponse[]> => {
  const params = {
    MobileApp: 'AppTest',
    MobileOS: 'ETC',
    pageNo: 1,
    numOfRows,
    keyword,
    contentTypeId,
  };

  try {
    const response = await axios.get(`${API_URLS.SEARCH_BASED}?serviceKey=${TOUR_API_KEY}`, {
      params,
    });

    // XML 데이터를 JSON으로 변환
    const parsedData = await xml2js.parseStringPromise(response.data, { explicitArray: false });

    // API 응답에서 items가 없을 경우 기본값 처리
    const items = parsedData.response?.body?.items?.item || [];

    // `items`가 객체로 들어올 수도 있으므로 배열인지 확인 후 변환
    const searchItems: SearchApiResponse[] = Array.isArray(items) ? items : [items];

    // 필요한 값만 추출
    return searchItems.map((item) => ({
      title: item.title,
      addr1: item.addr1 || '',
      firstimage: item.firstimage || '',
      firstimage2: item.firstimage2 || '',
      contenttypeid: item.contenttypeid || '',
      contentid: item.contentid || '',
      tel: item.tel || '',
    }));
  } catch (error) {
    console.error('API 오류:', error);
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

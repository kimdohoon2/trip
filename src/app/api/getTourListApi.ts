import axios from 'axios';
import xml2js from 'xml2js';
import { AreaItem } from '@/app/types/ItemType';
import { areaCodeMap, categoryMap } from '@/app/constant/SlideConstant';
import { API_URLS, TOUR_API_KEY } from '@/app/constant/apiConstants';

// 지역 기반 관광 정보 조회
export const getTourListApi = async (
  selectedArea: string,
  numOfRows: number,
  pageNo: number,
  selectcontentTypeId?: string
): Promise<AreaItem[]> => {
  const areaCode = areaCodeMap[selectedArea] || ''; // 선택된 지역에 맞는 areaCode
  const contentTypeId = selectcontentTypeId ? categoryMap[selectcontentTypeId] : '';
  const params = {
    MobileApp: 'AppTest',
    MobileOS: 'ETC',
    pageNo,
    numOfRows,
    areaCode,
    arrange: 'R',
    listYN: 'Y',
    contentTypeId,
  };

  try {
    const response = await axios.get(`${API_URLS.TOUR_LIST}?serviceKey=${TOUR_API_KEY}`, {
      params,
    });

    // XML 데이터를 JSON으로 변환
    const parsedData = await xml2js.parseStringPromise(response.data, { explicitArray: false });

    // 올바른 구조로 데이터 접근
    const items = parsedData.response.body.items.item;

    // 필요한 값만 추출
    return items.map((item: AreaItem) => ({
      title: item.title,
      addr1: item.addr1 || '',
      mapx: item.mapx,
      mapy: item.mapy,
      firstimage: item.firstimage || '',
      firstimage2: item.firstimage2 || '',
      contenttypeid: item.contenttypeid || '',
      contentid: item.contentid || '',
    }));
  } catch (error) {
    console.error('API 오류:', error);
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

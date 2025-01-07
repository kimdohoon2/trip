import axios from 'axios';
import xml2js from 'xml2js';
import { AreaItem } from '../type/ItemType';

const TOUR_API_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;
const TourAPiUrl = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1';

// 지역기반관광정보조회
export const TourListApi = async (): Promise<AreaItem[]> => {
  const params = {
    MobileApp: 'AppTest',
    MobileOS: 'ETC',
    pageNo: 1,
    numOfRows: 50,
    areaCode: '',
    arrange: 'R',
    listYN: 'Y',
  };

  try {
    const response = await axios.get(`${TourAPiUrl}?serviceKey=${TOUR_API_KEY}`, { params });

    // XML 데이터를 JSON으로 변환
    const parsedData = await xml2js.parseStringPromise(response.data, { explicitArray: false });

    // 전체 구조를 확인
    console.log('Parsed API Response:', JSON.stringify(parsedData, null, 2));

    // 올바른 구조로 데이터 접근: parsedData.response.body.items.item
    const items = parsedData.response.body.items.item;

    // 각 항목에서 필요한 값만 추출
    const formattedItems = items.map((item: AreaItem) => ({
      title: item.title,
      addr1: item.addr1 || '',
      mapx: item.mapx,
      mapy: item.mapy,
      firstimage: item.firstimage || '',
      firstimage2: item.firstimage2 || '',
      contenttypeid: item.contenttypeid || '',
      contentid: item.contentid || '',
    }));

    return formattedItems;
  } catch (error) {
    console.error('API 오류:', error);
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

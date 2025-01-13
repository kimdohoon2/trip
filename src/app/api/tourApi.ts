import axios from 'axios';
import xml2js from 'xml2js';
import { AreaItem } from '../types/ItemType';

const TOUR_API_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;
const TourAPiUrl = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1';

const areaCodeMap: { [key: string]: string } = {
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

// 지역기반관광정보조회
export const TourListApi = async (selectedArea: string): Promise<AreaItem[]> => {
  const areaCode = areaCodeMap[selectedArea] || ''; // 선택된 지역에 맞는 areaCode
  const params = {
    MobileApp: 'AppTest',
    MobileOS: 'ETC',
    pageNo: 1,
    numOfRows: 100,
    areaCode,
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

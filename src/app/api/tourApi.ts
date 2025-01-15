import axios from 'axios';
import xml2js from 'xml2js';
import { AreaItem } from '../types/ItemType';
import { areaCodeMap } from '../constant/SlideConstant';

const TOUR_API_KEY = process.env.NEXT_PUBLIC_TOUR_API_KEY;
const TourAPiUrl = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1';
const TourAPiLocation = 'https://apis.data.go.kr/B551011/KorService1/locationBasedList1';

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
    // console.log('Parsed API Response:', JSON.stringify(parsedData, null, 2));

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
// 사용자 위치 정보 가져오기
const getUserLocation = async (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation이 지원되지 않는 브라우저입니다.'));
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(new Error(`위치 정보를 가져오는 중 오류: ${error.message}`));
      }
    );
  });
};

// 위치 기반 관광정보 조회
export const LocationApi = async (): Promise<{ items: AreaItem[]; areaCode: string }> => {
  try {
    // 사용자 위치 가져오기
    const { latitude, longitude } = await getUserLocation();
    const params = {
      MobileApp: 'AppTest',
      MobileOS: 'ETC',
      pageNo: 1,
      mapX: longitude, // 소수점 6자리로 제한하고 문자열로 변환
      mapY: latitude, // 소수점 6자리로 제한하고 문자열로 변환
      radius: 5000,
      numOfRows: 100,
      arrange: 'R',
      listYN: 'Y',
    };
    const response = await axios.get(`${TourAPiLocation}?serviceKey=${TOUR_API_KEY}`, { params });

    // XML 데이터를 JSON으로 변환
    const parsedData = await xml2js.parseStringPromise(response.data, { explicitArray: false });

    console.log('Parsed API Response:', JSON.stringify(parsedData, null, 2));

    // API 응답에서 items가 없거나 잘못된 경우 처리
    const items = parsedData.response?.body?.items?.item || [];
    if (!Array.isArray(items)) {
      console.error('API 응답에 유효한 items가 없습니다.');
      return { items: [], areaCode: '' };
    }

    // 각 항목에서 필요한 값만 추출
    const formattedItems: AreaItem[] = items.map((item: AreaItem) => ({
      title: item.title,
      addr1: item.addr1 || '',
      mapx: item.mapx, // string으로 유지
      mapy: item.mapy, // string으로 유지
      dist: item.dist, // string | undefined로 유지
      firstimage: item.firstimage || '',
      firstimage2: item.firstimage2 || '',
      contenttypeid: item.contenttypeid || '',
      contentid: item.contentid || '',
      areaCode: item.areacode?.toString(), // areacode를 string으로 변환
    }));

    const areaCode = formattedItems[0]?.areaCode || '';

    return { items: formattedItems, areaCode };
  } catch (error) {
    console.error('API 오류:', error);
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

import axios from 'axios';
import { AreaItem } from '@/app/types/ItemType';
import { areaCodeMap, categoryMap } from '@/app/constant/SlideConstant';

export const getTourListApi = async (
  selectedArea: string,
  numOfRows: number,
  pageNo: number,
  selectcontentTypeId?: string
): Promise<AreaItem[]> => {
  const areaCode = areaCodeMap[selectedArea] || '';
  const contentTypeId = selectcontentTypeId ? categoryMap[selectcontentTypeId] : '';

  const params = {
    pageNo,
    numOfRows,
    areaCode,
    arrange: 'R',
    contentTypeId,
  };

  try {
    console.log('🔍 Request params:', params); // 요청 파라미터 확인
    const response = await axios.get('/api/tourlist', { params });
    console.log('✅ Response:', response.data); // 응답 확인

    const items = response.data?.response?.body?.items?.item ?? [];

    const list = Array.isArray(items) ? items : [items];

    return list.map((item: AreaItem) => ({
      title: item.title ?? '',
      addr1: item.addr1 ?? '',
      mapx: item.mapx ?? '',
      mapy: item.mapy ?? '',
      firstimage: item.firstimage ?? '',
      firstimage2: item.firstimage2 ?? '',
      contenttypeid: item.contenttypeid ?? '',
      contentid: item.contentid ?? '',
    }));
  } catch (error) {
    console.error('Tour API Error:', error);
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

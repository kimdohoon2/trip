import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const params = Object.fromEntries(
    [...searchParams.entries()].filter(([key, value]) => value !== '' && key !== '_')
  );

  if (!params.keyword) {
    return NextResponse.json({ message: 'keyword is required' }, { status: 400 });
  }

  if (params.lDongSignguCd && !params.lDongRegnCd) {
    return NextResponse.json({ message: 'lDongRegnCd is required' }, { status: 400 });
  }

  const serviceKey = process.env.TOUR_API_KEY;
  if (!serviceKey) {
    return NextResponse.json({ message: 'Service key not configured' }, { status: 500 });
  }

  try {
    const response = await axios.get('https://apis.data.go.kr/B551011/KorService2/searchKeyword2', {
      params: {
        pageNo: params.pageNo ?? 1,
        numOfRows: params.numOfRows ?? 10,
        arrange: params.arrange ?? 'R',
        keyword: params.keyword,
        serviceKey: decodeURIComponent(serviceKey), // 디코딩 추가
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        _type: 'json',
      },
      timeout: 10000,
    });

    // 공공데이터 API 에러 체크
    const resultCode = response.data?.response?.header?.resultCode;
    if (resultCode !== '0000') {
      console.error('API Error:', response.data?.response?.header);
      return NextResponse.json(
        {
          message: 'API Error',
          code: resultCode,
          detail: response.data?.response?.header?.resultMsg,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }

    return NextResponse.json({ message: 'Tour API Error' }, { status: 500 });
  }
}

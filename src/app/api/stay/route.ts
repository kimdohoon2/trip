import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const params = Object.fromEntries(
    [...searchParams.entries()].filter(([key, value]) => value !== '' && key !== '_')
  );

  // 필수 조건 검증
  if (params.lDongSignguCd && !params.lDongRegnCd) {
    return NextResponse.json({ message: 'lDongRegnCd is required' }, { status: 400 });
  }

  const serviceKey = decodeURIComponent(process.env.TOUR_API_KEY ?? '');

  try {
    const response = await axios.get('https://apis.data.go.kr/B551011/KorService2/searchStay2', {
      params: {
        ...params,
        serviceKey,
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        _type: 'json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error', error.response?.data);
    }
    return NextResponse.json({ message: 'Tour API Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const params = Object.fromEntries(
    [...searchParams.entries()].filter(([key, value]) => value !== '' && key !== '_')
  );

  const serviceKey = decodeURIComponent(process.env.TOUR_API_KEY ?? '');

  try {
    const response = await axios.get(
      'https://apis.data.go.kr/B551011/KorService2/searchFestival2',
      {
        params: {
          ...params,
          serviceKey,
          MobileOS: 'ETC',
          MobileApp: 'AppTest',
          _type: 'json',
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error');
      console.error('status:', error.response?.status);
      console.error('data:', error.response?.data);
    } else if (error instanceof Error) {
      console.error('JS Error:', error.message);
    }

    return NextResponse.json({ message: 'Tour API Error' }, { status: 500 });
  }
}

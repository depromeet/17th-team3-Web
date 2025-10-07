import { NextRequest, NextResponse } from 'next/server';

import { backendApi } from '@/app/_lib/apiServer';
import { ApiErrorResponse } from '@/app/_models/api';

export const GET = async (request: NextRequest) => {
  try {
    console.log('==================GET: /api/meetings================');
    const { searchParams } = request.nextUrl;
    const userId = searchParams.get('userId');

    const response = await backendApi.get('/meetings', {
      params: { userId },
    });

    console.log(`==================zxcvzxcv${response.status}================`);

    if (!response.ok) {
      const error = (await response.json()) as ApiErrorResponse;
      // error -> 인터셉터 withTokenRefresh의 JSON.stringify({ errorMessage: '인증이 만료되었습니다. 다시 로그인해주세요', shouldLogout: true })
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('모임 조회 중 에러:', error);
    return NextResponse.json({ errorMessage: '모임 조회 중 오류가 발생했습니다' }, { status: 500 });
  }
};

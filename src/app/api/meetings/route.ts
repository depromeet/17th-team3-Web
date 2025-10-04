import { NextRequest, NextResponse } from 'next/server';

import { api } from '@/app/_lib/apiClient';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = request.nextUrl;
    const userId = searchParams.get('userId');

    const response = await api.get('/meetings', {
      params: { userId },
    });

    if (response.status === 401) {
      return NextResponse.json({ error: '인증이 만료되었습니다' }, { status: 401 });
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: '모임 조회 중 오류가 발생했습니다' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('모임 조회 중 에러:', error);
    return NextResponse.json({ error: '모임 조회 중 오류가 발생했습니다' }, { status: 500 });
  }
};

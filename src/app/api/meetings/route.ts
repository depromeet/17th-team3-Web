import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 모임 목록 조회
 */
export const GET = async (request: NextRequest) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: '인증 토큰이 없습니다' }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const userId = searchParams.get('userId');

    const backendUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/meetings`);
    if (userId) {
      backendUrl.searchParams.set('userId', userId);
    }

    const response = await fetch(backendUrl.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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

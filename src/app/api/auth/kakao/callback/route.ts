import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 카카오 OAuth 콜백 처리
 * - 클라이언트에게 파라미터로 code를 받아 백엔드에 전달
 * - 백엔드로부터 받은 토큰을 httpOnly 쿠키로 설정
 * - 클라이언트로 httpOnly 쿠키 전송 (Set-Cookies)
 */
export async function GET(request: NextRequest) {
  console.log('====================', request, '===================');
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'code 파라미터가 필요합니다' }, { status: 400 });
  }

  try {
    // 백엔드에 code 전달하여 토큰 요청
    const response = await fetch(
      `https://api/proxy/api/v1/auth/kakao-login?code=${code}`,
      // `https://api.momuzzi.site/api/v1/auth/kakao-login?code=${code}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('백엔드 에러 응답:', errorText);
      return NextResponse.json(
        { error: '백엔드 인증 실패', errorText },
        { status: response.status }
      );
    }

    const { accessToken, refreshToken } = await response.json();

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: '토큰이 응답에 없습니다' }, { status: 500 });
    }

    const cookieStore = await cookies();

    // 액세스 토큰 쿠키 설정 (임시: 1시간)
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 로컬 환경: http
      sameSite: 'lax',
      path: '/',
      maxAge: 3600, // TODO: 백엔드 토큰 만료시간 확인 후 수정
    });

    // 리프레시 토큰 쿠키 설정 (임시: 7일)
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 604800, // TODO: 백엔드 토큰 만료시간 확인 후 수정
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('카카오 로그인 처리 중 에러:', error);
    return NextResponse.json({ error: '로그인 처리 중 오류가 발생했습니다' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

/**
 * 카카오 OAuth 초기화 엔드포인트
 * - 클라이언트로부터 리다이렉트 요청을 받아
 * - 카카오 OAuth 인증 페이지로 리다이렉트
 * - 환경변수는 서버 사이드에서만 접근 가능
 */

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URL = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;

if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URL) {
  throw new Error('Missing required Kakao environment variables');
}

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get('redirectTo');

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: KAKAO_CLIENT_ID,
    redirect_uri: KAKAO_REDIRECT_URL,
  });

  // 로그인 후 리다이렉트할 경로가 있으면 state에 추가
  if (redirectTo) {
    params.append('state', redirectTo);
  }

  return NextResponse.redirect(`https://kauth.kakao.com/oauth/authorize?${params.toString()}`);
};

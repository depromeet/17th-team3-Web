import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const kakaoRedirectUrl = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;

  if (!kakaoClientId || !kakaoRedirectUrl) {
    return NextResponse.json({ error: '카카오 관련 환경변수 없음' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get('redirectTo');

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: kakaoClientId,
    redirect_uri: kakaoRedirectUrl,
  });

  if (redirectTo) {
    params.append('state', redirectTo);
  }

  return NextResponse.redirect(`https://kauth.kakao.com/oauth/authorize?${params.toString()}`);
};

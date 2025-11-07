import { NextResponse } from 'next/server';

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

  if (redirectTo) {
    params.append('state', redirectTo);
  }

  return NextResponse.redirect(`https://kauth.kakao.com/oauth/authorize?${String(params)}`);
};

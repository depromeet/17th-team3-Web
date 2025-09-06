import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

// 예: 인증/리다이렉트/헤더 주입 등
const middleware = (req: NextRequest) => {
  // 예시: 헬스체크 경로 패스
  if (req.nextUrl.pathname === '/healthz') {
    return NextResponse.next();
  }

  // 예시: 프리뷰 쿠키 확인, 또는 간단한 A/B 헤더 주입
  // const res = NextResponse.next();
  // res.headers.set('x-app-version', process.env.NEXT_PUBLIC_VERSION ?? 'dev');
  // return res;

  return NextResponse.next();
};

// 정교한 매칭: 정적/이미지/파비콘/빌드 아티팩트 제외
export const config = {
  matcher: [
    // API 예외 처리: 필요 시 '!/api/:path*' 추가
    '/((?!_next/static|_next/image|favicon.ico|images|uploads|pdf).*)',
  ],
};

export default middleware;

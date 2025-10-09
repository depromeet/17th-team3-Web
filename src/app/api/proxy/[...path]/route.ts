import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { ApiErrorResponse } from '@/app/_models/api';

import { withTokenRefresh } from '../../../_lib/apiInterceptors';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL!;

/**
 * 공통 BFF 프록시 핸들러
 * - 클라이언트 요청을 백엔드로 프록시
 * - accessToken 자동 포함 (httpOnly 쿠키)
 * - 401 발생 시 자동 토큰 갱신 (withTokenRefresh)
 *
 * @example
 * 클라이언트에서: fetch('/api/proxy/meetings?userId=123')
 * 실제 요청: ${BACKEND_API}/meetings?userId=123
 */
const handler = async (
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> | { path: string[] } }
) => {
  try {
    const params = await context.params;
    const targetPath = `/${params.path.join('/')}`;
    const search = req.nextUrl.searchParams.toString();
    const queryString = search ? `?${search}` : '';
    console.log('✅ req:', queryString);

    const response = await withTokenRefresh(async (newToken?: string) => {
      const cookieStore = await cookies();
      const accessToken = newToken || cookieStore.get('accessToken')?.value;

      if (!accessToken) {
        return new Response(JSON.stringify({ errorMessage: '인증 토큰이 없습니다' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const url = `${BACKEND_API}${targetPath}${queryString}`;
      const headers: Record<string, string> = {
        Authorization: `Bearer ${accessToken}`,
      };
      console.log('✅ req:', queryString);

      const contentType = req.headers.get('content-type');
      if (contentType) headers['Content-Type'] = contentType;

      const body = ['GET', 'HEAD'].includes(req.method) ? undefined : await req.text();

      return fetch(url, {
        method: req.method,
        headers,
        body,
      });
    });
    // console.log('✅ response:', response);

    // withTokenRefresh에서 반환된 에러 응답 처리
    if (!response.ok) {
      const errorData = (await response.json()) as ApiErrorResponse;
      return NextResponse.json(errorData, { status: response.status });
    }

    // 정상 응답 전달
    const responseBody = await response.text();
    const nextResponse = new NextResponse(responseBody, { status: response.status });

    const responseContentType = response.headers.get('content-type');
    if (responseContentType) {
      nextResponse.headers.set('content-type', responseContentType);
    }

    return nextResponse;
  } catch (error) {
    console.error('[BFF Proxy Error]:', error);
    return NextResponse.json(
      { errorMessage: '프록시 요청 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;

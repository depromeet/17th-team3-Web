/**
 * 서버/클라이언트 통합 fetch 유틸리티
 * - 서버: cookies()로 토큰 추출 → 백엔드 직접 호출 (withTokenRefresh 포함)
 * - 클라이언트: /api/proxy 프록시 경유 (credentials: include)
 */

// import { cookies } from 'next/headers';

// import { withTokenRefresh } from './apiInterceptors';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL!;

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions extends Omit<RequestInit, 'method' | 'body'> {
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: any;
}

function buildQuery(params?: Record<string, any>): string {
  if (!params) return '';

  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return query ? `?${query}` : '';
}

/**
 * 메인 요청 함수
 * @param method - HTTP 메서드
 * @param path - API 경로 (예: '/meetings')
 * @param options - fetch 옵션 (params, body, headers 등)
 * @returns 파싱된 응답 데이터
 */
async function request<T>(
  method: HTTPMethod,
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  console.log('===================111111111====================');
  const isServer = typeof window === 'undefined';

  // 쿼리스트링 병합
  const query = buildQuery(options.params);
  const url = `${path}${query}`;

  // 공통 헤더 구성
  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // 본문 직렬화 (GET/HEAD는 body 제거)
  const body =
    // method === 'GET' || method === 'HEAD'
    method === 'GET'
      ? undefined
      : typeof options.body === 'string'
        ? options.body
        : options.body
          ? JSON.stringify(options.body)
          : undefined;

  if (isServer) {
    // ✅ 서버사이드 요청 (withTokenRefresh 포함)
    const { cookies } = await import('next/headers');
    const { withTokenRefresh } = await import('./apiInterceptors');

    const response = await withTokenRefresh(async (newToken?: string) => {
      const cookieStore = await cookies();
      const accessToken = newToken || cookieStore.get('accessToken')?.value;

      if (!accessToken) {
        return new Response(JSON.stringify({ errorMessage: '인증 토큰이 없습니다' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const headers = {
        ...baseHeaders,
        Authorization: `Bearer ${accessToken}`,
      };

      return fetch(`${BACKEND_API}${url}`, {
        ...options,
        method,
        headers,
        body,
        cache: 'no-store',
      });
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const text = await response.text();
    try {
      return text ? (JSON.parse(text) as T) : (undefined as T);
    } catch {
      return text as T;
    }
  } else {
    // ✅ 클라이언트 요청 (BFF 프록시 경유)
    console.log('===================33333333333333333====================', url);

    const res = await fetch(`/api/proxy${url}`, {
      ...options,
      method,
      credentials: 'include',
      headers: baseHeaders,
      body,
    });
    console.log('===================4444444444444====================', res);

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const text = await res.text();
    try {
      return text ? (JSON.parse(text) as T) : (undefined as T);
    } catch {
      return text as T;
    }
  }
}

/**
 * axios 스타일 메서드 헬퍼
 * @example
 * await fetchWithToken.get('/meetings', { params: { userId: '123' } });
 * await fetchWithToken.post('/meetings', { name: '새 모임' });
 */
export const fetchWithToken = {
  get: <T>(path: string, options?: FetchOptions) => request<T>('GET', path, options),
  post: <T>(path: string, body?: any, options?: FetchOptions) =>
    request<T>('POST', path, { ...options, body }),
  put: <T>(path: string, body?: any, options?: FetchOptions) =>
    request<T>('PUT', path, { ...options, body }),
  delete: <T>(path: string, options?: FetchOptions) => request<T>('DELETE', path, options),
  patch: <T>(path: string, body?: any, options?: FetchOptions) =>
    request<T>('PATCH', path, { ...options, body }),
};

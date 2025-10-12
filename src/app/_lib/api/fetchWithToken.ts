/**
 * 서버/클라이언트 통합 fetch 유틸리티
 * - 서버: 쿠키에서 토큰 추출 → 백엔드 직접 호출 (갱신 로직 포함)
 * - 클라이언트: 쿠키를 통한 /api/proxy 프록시 경유
 */

import { FetchOptions, HTTPMethod } from '@/app/_models/api';

const BACKEND_API = process.env.NEXT_PUBLIC_API_URL!;

const toQueryString = (params?: Record<string, any>): string => {
  if (!params) return '';

  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return query ? `?${query}` : '';
};

const request = async <T, B = unknown>(
  method: HTTPMethod,
  path: string,
  options: FetchOptions<B> = {}
): Promise<T> => {
  const isServer = typeof window === 'undefined';

  const query = toQueryString(options.params);
  const url = query ? `${path}${query}` : path;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const body =
    method === 'GET'
      ? undefined
      : typeof options.body === 'string'
        ? options.body
        : options.body
          ? JSON.stringify(options.body)
          : undefined;

  if (isServer) {
    const { cookies } = await import('next/headers');
    const { withTokenRefresh } = await import('./interceptors');

    const response = await withTokenRefresh(async (newToken?: string) => {
      const cookieStore = await cookies();
      const accessToken = newToken || cookieStore.get('accessToken')?.value;

      if (!accessToken) {
        return new Response(
          JSON.stringify({
            errorMessage: '인증 토큰이 없습니다',
            shouldLogout: true,
          }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      const headersWithAuth = {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      };

      return fetch(`${BACKEND_API}${url}`, {
        ...options,
        method,
        headers: headersWithAuth,
        body,
        cache: 'no-store',
      });
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { errorMessage: '알 수 없는 에러가 발생했습니다.' };
      }

      if (response.status === 401 && errorData.shouldLogout) {
        const { redirect } = await import('next/navigation');
        const cookieStore = await cookies();

        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');

        redirect('/login');
      }

      throw {
        status: response.status,
        message: errorData.errorMessage || 'API 요청 실패',
        data: errorData,
      };
    }

    const responseText = await response.text();
    return responseText ? (JSON.parse(responseText) as T) : (undefined as T);
  } else {
    const response = await fetch(`/api/proxy${url}`, {
      ...options,
      method,
      credentials: 'include',
      headers,
      body,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { errorMessage: 'Unknown error' };
      }

      if (response.status === 401 && errorData.shouldLogout) {
        const { logout } = await import('@/app/_services/auth');
        await logout();
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      }

      throw {
        status: response.status,
        message: errorData.errorMessage || 'API 요청 실패',
        data: errorData,
      };
    }

    const responseText = await response.text();
    return responseText ? (JSON.parse(responseText) as T) : (undefined as T);
  }
};

export const api = {
  get: <T>(path: string, options?: FetchOptions) => request<T>('GET', path, options),
  post: <T, B>(path: string, body?: B, options?: FetchOptions<B>) =>
    request<T, B>('POST', path, { ...options, body }),
  put: <T, B>(path: string, body?: B, options?: FetchOptions) =>
    request<T, B>('PUT', path, { ...options, body }),
  patch: <T, B>(path: string, body?: B, options?: FetchOptions) =>
    request<T, B>('PATCH', path, { ...options, body }),
  delete: <T>(path: string, options?: FetchOptions) => request<T>('DELETE', path, options),
};

/**
 * API Routes에서 사용 (백엔드 API 호출)
 * - cookies()로 accessToken 추출 (cookies는 RSC 전용)
 * - 백엔드 API에 Bearer 토큰 전달
 */

import { cookies } from 'next/headers';

import { ApiOptions, Method } from '@/app/_models/api';

import { withTokenRefresh } from './apiInterceptors';

export const callBackendApi = async (
  path: string,
  method: Method,
  options?: ApiOptions
): Promise<Response> => {
  console.log('==================callBackendApi11111================');
  return withTokenRefresh(async (newToken?: string) => {
    console.log('==================callBackendApi22222================');
    const cookieStore = await cookies();
    // const accessToken = cookieStore.get('accessToken')?.value;
    const accessToken = newToken || cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return new Response(JSON.stringify({ errorMessage: '인증 토큰이 없습니다' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${path}`);

    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    // return fetch(String(url), {
    //   method,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${accessToken}`,
    //     ...options?.headers,
    //   },
    //   body: options?.body ? JSON.stringify(options.body) : undefined,
    // });
    return {
      ok: true,
      status: 200,
      json: async () => ({ data: [{ 1: 'a', 2: 'b', 3: 'c' }] }),
    } as Response;
  });
};

export const backendApi = {
  /**
   * @example
   * - await backendApi.get('/meetings?userId=123') || await backendApi.get('/meetings', { params: { userId: 123 } });
   */
  get: (path: string, options?: Omit<ApiOptions, 'body'>) => callBackendApi(path, 'GET', options),
  /**
   * @example
   * await backendApi.post('/meetings', { body: { name: '새로운 모무찌' } });
   */
  post: (path: string, options?: ApiOptions) => callBackendApi(path, 'POST', options),
  /**
   * @example
   * await backendApi.put('/meetings/1', { body: { name: '수정된 모무찌' } });
   */
  put: (path: string, options?: ApiOptions) => callBackendApi(path, 'PUT', options),
  /**
   * @example
   * await backendApi.patch('/meetings/1', { body: { name: '수정된 모무찌' } });
   */
  patch: (path: string, options?: ApiOptions) => callBackendApi(path, 'PATCH', options),
  /**
   * @example
   * await backendApi.delete('/meetings/1');
   * @description
   * HTTP 명세상 body 허용하지만 RESTful 관례상 제외
   */
  delete: (path: string, options?: Omit<ApiOptions, 'body'>) =>
    callBackendApi(path, 'DELETE', options),
};

/**
 * API Routes에서 사용 (백엔드 API 호출)
 * - cookies()로 accessToken 추출 (cookies는 RSC 전용)
 * - 백엔드 API에 Bearer 토큰 전달
 */

import { cookies } from 'next/headers';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ServerApiOptions extends Omit<RequestInit, 'method' | 'body'> {
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: any;
}

export const serverApi = async (
  path: string,
  method?: Method,
  options?: ServerApiOptions
): Promise<Response> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    throw new Error('인증 토큰이 없습니다');
  }

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${path}`);

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return fetch(String(url), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
};

export const backendApi = {
  /**
   * @example
   * - await api.get('/meetings?userId=123') || await api.get('/meetings', { params: { userId: 123 } });
   */
  get: (path: string, options?: Omit<ServerApiOptions, 'body'>) => serverApi(path, 'GET', options),
  /**
   * @example
   * await api.post('/meetings', { body: { name: '새로운 모무찌' } });
   */
  post: (path: string, options?: ServerApiOptions) => serverApi(path, 'POST', options),
  /**
   * @example
   * await api.put('/meetings/1', { body: { name: '수정된 모무찌' } });
   */
  put: (path: string, options?: ServerApiOptions) => serverApi(path, 'PUT', options),
  /**
   * @example
   * await api.patch('/meetings/1', { body: { name: '수정된 모무찌' } });
   */
  patch: (path: string, options?: ServerApiOptions) => serverApi(path, 'PATCH', options),
  /**
   * @example
   * await api.delete('/meetings/1');
   * @description
   * HTTP 명세상으로는 body를 허용하지만, 관례를 고려해 제외함
   */
  delete: (path: string, options?: Omit<ServerApiOptions, 'body'>) =>
    serverApi(path, 'DELETE', options),
};

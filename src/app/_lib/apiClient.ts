/**
 * Client Component에서 사용 (API Routes 호출)
 * - credentials: 'include'로 쿠키 자동 전달
 */

'use client';

import { ApiOptions, Method } from '@/app/_models/api';

const callApiRoute = async (
  path: string,
  method: Method,
  options?: ApiOptions
): Promise<Response> => {
  const url = new URL(path, window.location.origin);

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
    },
    credentials: 'include',
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
};

export const api = {
  /**
   * @example
   * - await api.get('/apapi/meetings?userId=123') || await api.get('/meetings', { params: { userId: 123 } });
   */
  get: (path: string, options?: Omit<ApiOptions, 'body'>) => callApiRoute(path, 'GET', options),
  /**
   * @example
   * await api.post('/api/meetings', { body: { name: '새로운 모무찌' } });
   */
  post: (path: string, options?: ApiOptions) => callApiRoute(path, 'POST', options),
  /**
   * @example
   * await api.put('/api/meetings/1', { body: { name: '수정된 모무찌' } });
   */
  put: (path: string, options?: ApiOptions) => callApiRoute(path, 'PUT', options),
  /**
   * @example
   * await api.patch('/api/meetings/1', { body: { name: '수정된 모무찌' } });
   */
  patch: (path: string, options?: ApiOptions) => callApiRoute(path, 'PATCH', options),
  /**
   * @example
   * await api.delete('/api/meetings/1');
   * @description
   * HTTP 명세상으로는 body를 허용하지만, 관례를 고려해 제외함
   */
  delete: (path: string, options?: Omit<ApiOptions, 'body'>) =>
    callApiRoute(path, 'DELETE', options),
};

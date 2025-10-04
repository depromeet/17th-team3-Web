import { cookies } from 'next/headers';

interface ApiClientOptions extends Omit<RequestInit, 'method' | 'body'> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: any;
}

/**
 * 백엔드 API 호출 유틸리티
 * - 쿠키에서 accessToken 자동 추출
 * - Authorization 헤더 자동 주입
 * - Query Parameter 자동 생성
 *
 * @param path - API 경로 (예: '/meetings', '/user/me')
 * @param options - fetch 옵션 (method, params, body 등)
 * @returns fetch Response 객체
 * @throws 토큰이 없으면 Unauthorized 발생
 */
export const apiClient = async (path: string, options?: ApiClientOptions): Promise<Response> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    throw new Error('인증 토큰이 없습니다');
  }

  // URL 생성 및 Query Parameter 추가
  const backendUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}${path}`);

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        backendUrl.searchParams.set(key, String(value));
      }
    });
  }

  // body가 객체면 JSON.stringify
  const body =
    options?.body && typeof options.body === 'object'
      ? JSON.stringify(options.body)
      : options?.body;

  return fetch(backendUrl.toString(), {
    method: options?.method || 'GET',
    ...options,
    body,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

/**
 * HTTP 메서드별 헬퍼 함수
 */
export const api = {
  /**
   * @example
   * await api.get('/meetings', { params: { userId: 123 } });
   */
  get: (path: string, options?: Omit<ApiClientOptions, 'method'>) =>
    apiClient(path, { ...options, method: 'GET' }),

  /**
   * @example
   * await api.post('/meetings', { body: { name: '저녁 모무찌' } });
   */
  post: (path: string, options?: Omit<ApiClientOptions, 'method'>) =>
    apiClient(path, { ...options, method: 'POST' }),

  /**
   * @example
   * await api.put('/meetings/1', { body: { name: '수정된 모무찌' } });
   */
  put: (path: string, options?: Omit<ApiClientOptions, 'method'>) =>
    apiClient(path, { ...options, method: 'PUT' }),

  /**
   * @example
   * await api.patch('/meetings/1', { body: { name: '수정된 모무찌' } });
   */
  patch: (path: string, options?: Omit<ApiClientOptions, 'method'>) =>
    apiClient(path, { ...options, method: 'PATCH' }),

  /**
   * @example
   * await api.delete('/meetings/1');
   */
  delete: (path: string, options?: Omit<ApiClientOptions, 'method'>) =>
    apiClient(path, { ...options, method: 'DELETE' }),
};

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface FetchOptions<B = unknown> extends Omit<RequestInit, 'method' | 'body'> {
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: B;
}

export interface FetchErrorResponse {
  errorMessage: string;
  shouldLogout?: boolean;
}

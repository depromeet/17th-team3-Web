export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface FetchOptions<B = unknown> extends Omit<RequestInit, 'method' | 'body'> {
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: B;
}

export interface ApiSuccessResponse<T> {
  data: T;
  error: null;
}

export interface ApiErrorResponse {
  data: null;
  error: {
    name: string;
    code: string;
    message: string;
    detail: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface FetchErrorResponse {
  errorMessage: string;
  shouldLogout?: boolean;
}

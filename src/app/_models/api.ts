export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface FetchOptions extends Omit<RequestInit, 'method' | 'body'> {
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: any;
}

export interface FetchErrorResponse {
  errorMessage: string;
  shouldLogout?: boolean;
}

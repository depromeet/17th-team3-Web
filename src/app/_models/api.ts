export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiOptions extends Omit<RequestInit, 'method' | 'body'> {
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: any;
}

export type ApiErrorResponse = {
  errorMessage: string;
  shouldLogout?: boolean;
};

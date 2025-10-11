import { api } from '@/app/_lib/api';

export const meetingsApi = {
  getMeetings: () => api.get('/meetings'),
};

import { api } from '@/app/_lib/api';

export const meetingsApi = {
  getList: async (userId: string) => {
    return await api.get('/meetings', {
      params: { userId },
    });
  },
};

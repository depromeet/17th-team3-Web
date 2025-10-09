import { api } from '@/app/_lib/apiClient';

export const meetingService = {
  getList: async (userId: string) => {
    const response = await api.get('/meetings', {
      params: { userId },
    });

    return await response.json();
  },
};

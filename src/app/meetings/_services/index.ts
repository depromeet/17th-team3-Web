import { api } from '@/app/_lib/apiClient';
import { ApiErrorResponse } from '@/app/_models/api';

export const meetingService = {
  getList: async (userId: string) => {
    const response = await api.get(`/meetings`, {
      params: { userId },
    });
    console.log('===========meetingService============', response.status);

    if (response.status === 401) {
      const error = (await response.json()) as ApiErrorResponse;
      if (error.shouldLogout) {
        logout();
        throw new Error(error.errorMessage);
      }
    }

    if (!response.ok) {
      throw new Error('모임 조회에 실패하였습니다');
    }

    return response.json();
  },
};

const logout = async () => {
  try {
    await api.post('/auth/logout');
  } finally {
    window.location.href = '/login';
  }
};

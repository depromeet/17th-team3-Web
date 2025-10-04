export const meetingService = {
  getList: async (userId: string) => {
    const response = await fetch(`/api/meetings?userId=${userId}`, { method: 'GET' });
    return response.json();
  },
};

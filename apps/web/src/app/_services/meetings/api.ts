import { api } from '@/app/_lib/api';

export const meetingsApi = {
  // 사용자 모임 목록 조회
  getMeetings: () => api.get('/meetings'),
  // 모임 생성
  createMeeting: () => {
    const mockForm = {
      name: '오늘 뭐먹을건데',
      attendeeNickname: '나야 혁준',
      attendeeCount: 10,
      stationId: 1,
      endAt: '2025-10-15T09:00:00.000Z',
    };
    return api.post('/meetings', mockForm);
  },
  // 모임 초대 토큰 생성
  getMeetingToken: (meetingId: string) => api.post(`/meetings/${meetingId}/invite-token`),
  // 모임 참여
  joinMeeting: (meetingId: string, attendeeNickname: string) =>
    api.post('/meetings/join', { meetingId, attendeeNickname }),
  // 모임 초대 토큰 검증
  validateToken: (token: string) =>
    api.get('/meetings/validate-invite', {
      params: { token },
    }),
};

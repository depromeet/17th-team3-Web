import { api } from '@/app/_lib/api';

export const meetingsApi = {
  // 사용자 모임 목록 조회
  getMeetings: () => api.get('/meetings'),
  // 모임 생성
  createMeeting: () =>
    api.post('/meetings', {
      name: '오늘 뭐먹을건데',
      attendeeNickname: '나야 혁준',
      attendeeCount: 10,
      stationId: 1, // 지하철역 API?
      endAt: '2025-10-15T09:00:00.000Z', // 형식 정의 필요
    }),
  // 모임 초대 토큰 생성
  getMeetingToken: (meetingId: string) => api.post(`/meetings/${meetingId}/invite-token`),
  // 모임 참여
  joinMeeting: () =>
    api.post('/meetings/join', {
      meetingId: 1,
      attendeeNickname: '오늘 뭐먹을건데',
    }),
  // 모임 초대 토큰 검증
  validateToken: () => api.get('/meetings/validate-invite'),
};

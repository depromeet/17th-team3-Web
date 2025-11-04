import { api } from '@/app/_lib/api';
import {
  CreateMeetingRequest,
  CreateMeetingResponse,
  Station,
} from '@/app/meetings/create/_models/types';

import { formatMeetingResponse } from './format';

import type { MeetingResponse } from '@/app/_models/meeting';

export const meetingsApi = {
  getMeetings: async () => {
    const responses = await api.get<MeetingResponse[]>('/meetings');
    return responses.map(formatMeetingResponse);
  },
  createMeeting: (form: CreateMeetingRequest) =>
    api.post<CreateMeetingResponse, CreateMeetingRequest>('/meetings', form),
  getMeetingToken: (meetingId: number) => api.post(`/meetings/${meetingId}/invite-token`, {}),
  getStations: (query?: string) =>
    api.get<Station[]>('/stations', {
      params: query ? { q: query } : undefined,
    }),
} as const;

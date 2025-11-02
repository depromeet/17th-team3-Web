import { api } from '@/app/_lib/api';
import {
  CreateMeetingRequest,
  CreateMeetingResponse,
  Station,
} from '@/app/meetings/create/_models/types';

import { formatCreateMeetingResponse, formatMeetingResponse } from './format';

import type { MeetingResponse } from '@/app/(home)/_models/types';

export const meetingsApi = {
  getMeetings: async () => {
    const response = await api.get<MeetingResponse[]>('/meetings');
    return response.map(formatMeetingResponse);
  },
  createMeeting: async (form: CreateMeetingRequest) => {
    const response = await api.post<CreateMeetingResponse, CreateMeetingRequest>('/meetings', form);
    return formatCreateMeetingResponse(response);
  },
  getMeetingToken: (meetingId: number) => api.post(`/meetings/${meetingId}/invite-token`, {}),
  getStations: (query?: string) =>
    api.get<Station[]>('/stations', {
      params: query ? { q: query } : undefined,
    }),
} as const;

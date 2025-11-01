import { api } from '@/app/_lib/api';
import {
  CreateMeetingRequest,
  CreateMeetingResponse,
  Station,
} from '@/app/meetings/create/_models/types';

import type { Meeting } from '@/app/(home)/_models/types';

export const meetingsApi = {
  getMeetings: () => api.get<Meeting[]>('/meetings'),
  createMeeting: (form: CreateMeetingRequest) =>
    api.post<CreateMeetingResponse, CreateMeetingRequest>('/meetings', form),
  getMeetingToken: (meetingId: number) => api.post(`/meetings/${meetingId}/invite-token`, {}),
  getStations: (query?: string) =>
    api.get<Station[]>('/stations', {
      params: query ? { q: query } : undefined,
    }),
} as const;

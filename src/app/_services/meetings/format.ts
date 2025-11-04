import type { Meeting } from '@/app/(home)/_models/types';
import type { MeetingResponse } from '@/app/_models/meeting';

export const formatMeetingResponse = (response: MeetingResponse): Meeting => ({
  ...response.meetingInfo,
  participantList: response.participantList,
});

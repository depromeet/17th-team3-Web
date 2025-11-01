import type { Meeting, MeetingResponse } from '@/app/(home)/_models/types';

export const formatMeetingResponse = (response: MeetingResponse): Meeting => ({
  ...response.meetingInfo,
  participantList: response.participantList,
});

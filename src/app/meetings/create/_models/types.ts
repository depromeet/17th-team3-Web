import { SHARE_OPTIONS } from '@/app/meetings/create/_models/constants';

export type ShareType = (typeof SHARE_OPTIONS)[number]['id'];

export interface CreateMeetingForm {
  name: string;
  members: number;
  location: string;
  date: string;
  time: string;
}

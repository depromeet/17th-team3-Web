import { MeetingInfo } from '@/app/_models/meeting';

export interface MeetingResponse {
  meetingInfo: MeetingInfo;
  participantList: Participant[];
}

export interface Participant {
  userId: number;
  attendeeNickname: string;
  color: string; // TODO: 아이콘 Union 타입으로 변경 필요
}

export interface Meeting extends MeetingInfo {
  participantList: Participant[];
}

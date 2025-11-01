// TODO: API 응답 타입과 도메인 타입 분리 필요

import { MeetingInfo } from '@/app/_models/meeting';

export interface Participant {
  userId: number;
  attendeeNickname: string;
  color: string; // TODO: 아이콘 Union 타입으로 변경 필요
}

export interface Meeting extends MeetingInfo {
  participantList: Participant[];
}

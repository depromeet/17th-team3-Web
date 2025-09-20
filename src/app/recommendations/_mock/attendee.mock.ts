import { AttendeesData } from './attendee.types';

/**
 * 참석자 목데이터
 * 실제 API 연동 전까지 사용할 샘플 데이터
 */
export const attendeesMockData: AttendeesData = {
  totalAttendees: 5,
  notYetSelectedAttendees: 2,
  attendees: [
    {
      id: '1',
      name: '곽두팔',
      avatar: '🥩',
      preferredFoods: ['korean', 'chinese', 'western', 'indian', 'thai', 'vietnamese', 'mexican'],
      avoidedFoods: ['japanese', 'bunsik'],
    },
    {
      id: '2',
      name: '진혁이',
      avatar: '🍖',
      preferredFoods: ['korean', 'chinese', 'western', 'indian', 'thai', 'bunsik'],
      avoidedFoods: ['japanese', 'vietnamese', 'mexican'],
    },
    {
      id: '3',
      name: '지현이',
      avatar: '🍣',
      preferredFoods: ['korean', 'chinese', 'western', 'indian', 'thai', 'bunsik'],
      avoidedFoods: ['japanese', 'vietnamese', 'mexican'],
    },
  ],
};

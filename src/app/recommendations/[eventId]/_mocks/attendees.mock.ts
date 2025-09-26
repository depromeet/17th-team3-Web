import { AttendeesData } from '@/app/recommendations/[eventId]/_models/attendee';

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
      name: '진혁이',
      avatar: '/images/avatar/avatar1.svg',
      preferredFoods: ['korean', 'chinese', 'western', 'indian', 'thai', 'vietnamese', 'mexican'],
      avoidedFoods: ['japanese', 'bunsik'],
    },
    {
      id: '2',
      name: '팔도비빔면너무좋아',
      avatar: '/images/avatar/avatar2.svg',
      preferredFoods: ['korean', 'chinese', 'western', 'indian', 'thai', 'bunsik'],
      avoidedFoods: ['japanese', 'vietnamese', 'mexican'],
    },
    {
      id: '3',
      name: '나는야오빠주인공',
      avatar: '/images/avatar/avatar3.svg',
      preferredFoods: ['korean', 'chinese', 'western', 'indian', 'thai', 'bunsik'],
      avoidedFoods: ['japanese', 'vietnamese', 'mexican'],
    },
  ],
};

import { AttendeesData } from '@/app/recommendations/[eventId]/_models/attendee';

/**
 * 참석자 목데이터
 * 실제 API 연동 전까지 사용할 샘플 데이터
 */
export const attendeesMockData: AttendeesData = {
  totalAttendees: 6,
  notYetSelectedAttendees: 2,
  attendees: [
    {
      id: '1',
      name: '팔도비빔면너무좋아',
      avatar: '/images/avatar/avatar1.svg',
      preferredFoods: ['korean', 'chinese', 'western'],
      avoidedFoods: ['japanese'],
      avatarThemeKey: 'default',
    },
    {
      id: '2',
      name: '진혁이',
      avatar: '/images/avatar/avatar2.svg',
      preferredFoods: ['korean', 'chinese', 'western'],
      avoidedFoods: ['japanese'],
      avatarThemeKey: 'grape',
    },
    {
      id: '3',
      name: '나는야오빠주인공',
      avatar: '/images/avatar/avatar3.svg',
      preferredFoods: ['korean', 'chinese', 'western'],
      avoidedFoods: ['japanese', 'southeast'],
      avatarThemeKey: 'chocolate',
    },
    {
      id: '4',
      name: '빵빠라빵',
      avatar: '/images/avatar/avatar4.svg',
      preferredFoods: ['korean', 'chinese', 'western', 'southeast'],
      avoidedFoods: ['japanese'],
      avatarThemeKey: 'orange',
    },
  ],
};

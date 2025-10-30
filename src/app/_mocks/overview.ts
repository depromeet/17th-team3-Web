import { CUISINE_MAP } from '@/app/_constants/cuisine';
import { Overview } from '@/app/_services/overview';

//1: 한식, 4: 중식, 5: 양식, 6: 일식, 7: 동남아

const overviewMockData: Overview = {
  surveys: [
    {
      participantId: 1,
      nickname: '정진혁',
      avatarColor: 'default',
      selectedCategoryList: [
        {
          id: 1,
          name: CUISINE_MAP[1],
          menuList: [
            {
              id: 1,
              name: '김치찌개',
            },
            {
              id: 2,
              name: '된장찌개',
            },
            {
              id: 3,
              name: '불고기',
            },
            {
              id: 4,
              name: '순대국',
            },
          ],
        },
        {
          id: 4,
          name: CUISINE_MAP[4],
          menuList: [
            {
              id: 1,
              name: '짜장면',
            },
            {
              id: 2,
              name: '짬뽕',
            },
            {
              id: 3,
              name: '탕수육',
            },
          ],
        },
        {
          id: 5,
          name: CUISINE_MAP[5],
          menuList: [
            {
              id: 1,
              name: '피자',
            },
          ],
        },
        {
          id: 6,
          name: CUISINE_MAP[6],
          menuList: [
            {
              id: 1,
              name: '초밥',
            },
            {
              id: 2,
              name: '라멘',
            },
          ],
        },
        {
          id: 7,
          name: '동남아 음식',
          menuList: [
            {
              id: 1,
              name: '베트남 음식',
            },
          ],
        },
      ],
    },
    {
      participantId: 2,
      nickname: '이영희랑 숭구리당당구리당 신신랑 모두 함께해야 추천.',
      avatarColor: 'grape',
      selectedCategoryList: [
        {
          id: 1,
          name: CUISINE_MAP[1],
          menuList: [
            {
              id: 1,
              name: '김치찌개',
            },
          ],
        },
        {
          id: 4,
          name: CUISINE_MAP[4],
          menuList: [
            {
              id: 1,
              name: '짜장면',
            },
            {
              id: 2,
              name: '짬뽕',
            },
          ],
        },
        {
          id: 6,
          name: CUISINE_MAP[6],
          menuList: [
            {
              id: 1,
              name: '초밥',
            },
          ],
        },
        {
          id: 7,
          name: '동남아 음식',
          menuList: [
            {
              id: 1,
              name: '베트남 음식',
            },
          ],
        },
      ],
    },
  ],
  totalAttendees: 4,
  notYetParticipationAttendees: 2,
  isMyParticipation: true,
  endAt: '2025-10-30 10:00:00',
};

export default overviewMockData;

import type { FoodCategoryResponse } from '@/app/survey/_models/types';

export const mockSurveyCuisineData: FoodCategoryResponse = {
  data: [
    {
      id: 1,
      level: 'BRANCH',
      name: '한식',
      sortOrder: 1,
      children: [
        { id: 8, level: 'LEAF', name: '밥류', sortOrder: 1, children: [] },
        { id: 9, level: 'LEAF', name: '구이·조림류', sortOrder: 2, children: [] },
        { id: 10, level: 'LEAF', name: '국·탕·찌개류', sortOrder: 3, children: [] },
        { id: 11, level: 'LEAF', name: '분식', sortOrder: 4, children: [] },
        { id: 12, level: 'LEAF', name: '전·부침류', sortOrder: 5, children: [] },
      ],
    },
    {
      id: 4,
      level: 'BRANCH',
      name: '중식',
      sortOrder: 2,
      children: [
        { id: 13, level: 'LEAF', name: '면류', sortOrder: 1, children: [] },
        { id: 14, level: 'LEAF', name: '밥류', sortOrder: 2, children: [] },
        { id: 15, level: 'LEAF', name: '튀김·볶음류', sortOrder: 3, children: [] },
        { id: 16, level: 'LEAF', name: '딤섬·만두류', sortOrder: 4, children: [] },
        { id: 17, level: 'LEAF', name: '국물요리', sortOrder: 5, children: [] },
      ],
    },
    {
      id: 5,
      level: 'BRANCH',
      name: '양식',
      sortOrder: 3,
      children: [
        { id: 18, level: 'LEAF', name: '파스타', sortOrder: 1, children: [] },
        { id: 19, level: 'LEAF', name: '스테이크', sortOrder: 2, children: [] },
        { id: 20, level: 'LEAF', name: '피자', sortOrder: 3, children: [] },
        { id: 21, level: 'LEAF', name: '샐러드·샌드위치', sortOrder: 4, children: [] },
        { id: 22, level: 'LEAF', name: '리조토', sortOrder: 5, children: [] },
      ],
    },
    {
      id: 6,
      level: 'BRANCH',
      name: '일식',
      sortOrder: 4,
      children: [
        { id: 23, level: 'LEAF', name: '초밥·사시미', sortOrder: 1, children: [] },
        { id: 24, level: 'LEAF', name: '밥류', sortOrder: 2, children: [] },
        { id: 25, level: 'LEAF', name: '면류', sortOrder: 3, children: [] },
        { id: 26, level: 'LEAF', name: '튀김·구이류', sortOrder: 4, children: [] },
        { id: 27, level: 'LEAF', name: '탕·나베류', sortOrder: 5, children: [] },
      ],
    },
    {
      id: 7,
      level: 'BRANCH',
      name: '기타 해외 음식',
      sortOrder: 5,
      children: [
        { id: 28, level: 'LEAF', name: '베트남 음식', sortOrder: 1, children: [] },
        { id: 31, level: 'LEAF', name: '멕시코 음식', sortOrder: 2, children: [] },
        { id: 32, level: 'LEAF', name: '인도 음식', sortOrder: 3, children: [] },
        { id: 33, level: 'LEAF', name: '태국 음식', sortOrder: 4, children: [] },
      ],
    },
    {
      id: 3,
      level: 'BRANCH',
      name: '다 괜찮아요',
      sortOrder: 6,
      children: [],
    },
  ],
  error: null,
} as const;

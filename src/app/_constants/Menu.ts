export type FoodKey =
  | 'mexican'
  | 'vietnamese'
  | 'bunsik'
  | 'western'
  | 'indian'
  | 'japanese'
  | 'chinese'
  | 'thai'
  | 'korean';

interface FoodMeta {
  name: string;
  imageSrc: string;
}

export const FOOD_MAP = {
  mexican: { name: '멕시칸', imageSrc: '/images/menu/멕시칸.svg' },
  vietnamese: { name: '베트남 음식', imageSrc: '/images/menu/베트남 음식.svg' },
  bunsik: { name: '분식', imageSrc: '/images/menu/분식.svg' },
  western: { name: '양식', imageSrc: '/images/menu/양식.svg' },
  indian: { name: '인도 음식', imageSrc: '/images/menu/인도 음식.svg' },
  japanese: { name: '일식', imageSrc: '/images/menu/일식.svg' },
  chinese: { name: '중식', imageSrc: '/images/menu/중식.svg' },
  thai: { name: '태국 음식', imageSrc: '/images/menu/태국 음식.svg' },
  korean: { name: '한식', imageSrc: '/images/menu/한식.svg' },
} as const satisfies Record<FoodKey, FoodMeta>;

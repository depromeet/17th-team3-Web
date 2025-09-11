export type Option = { id: string; label: string };

// '기타'가 필요한 스텝에는 반드시 포함
export const MOOD_OPTIONS: Option[] = [
  { id: 'mood:any', label: '어떤 분위기든 좋아요!' },
  { id: 'mood:quick', label: '오늘은 간단히, 빨리 먹고 싶어요' },
  { id: 'mood:full', label: '배부르게 든든하게 먹고 싶어요' },
  { id: 'mood:alcohol', label: '술안주랑 함께, 한잔하는 자리가 좋아요' },
  { id: 'mood:other', label: '기타' },
];

export const CUISINE_OPTIONS: Option[] = [
  { id: 'cuisine:any', label: '다 괜찮아요!' },
  { id: 'cuisine:korean', label: '한식' },
  { id: 'cuisine:japanese', label: '일식' },
  { id: 'cuisine:chinese', label: '중식' },
  { id: 'cuisine:western', label: '양식' },
  { id: 'cuisine:vietnamese', label: '베트남 음식' },
  { id: 'cuisine:mexican', label: '멕시칸' },
  { id: 'cuisine:indian', label: '인도 음식' },
  { id: 'cuisine:thai', label: '태국 음식' },
  // { id: 'cuisine:other', label: '기타' }, // 필요 시 추가
];

export const TASTE_OPTIONS: Option[] = [
  { id: 'taste:any', label: '다 괜찮아요!' },
  { id: 'taste:spicy', label: '자극적이고 매운 맛' },
  { id: 'taste:clean', label: '담백·깔끔한 맛' },
  { id: 'taste:oily', label: '기름지고 진한 맛' },
  // { id: 'taste:other', label: '기타' },
];

export const AVOID_INGREDIENT_OPTIONS: Option[] = [
  { id: 'avoid:any', label: '없어요!' },
  { id: 'avoid:vegetarian', label: '채식 주의' },
  { id: 'avoid:gluten', label: '글루텐 프리' },
  { id: 'avoid:nuts', label: '견과류 알레르기' },
  { id: 'avoid:seafood', label: '해산물 알레르기' },
  // { id: 'avoid:other', label: '기타' },
];

export const UNWANTED_MENU_OPTIONS: Option[] = [
  { id: 'unwanted:any', label: '없어요!' },
  { id: 'unwanted:raw', label: '회, 날 것' },
  { id: 'unwanted:innard', label: '내장, 특수부위' },
  { id: 'unwanted:dairy', label: '치즈 · 유제품' },
  { id: 'unwanted:greasy', label: '너무 기름진 음식' },
  { id: 'unwanted:cilantro', label: '고수' },
  // { id: 'unwanted:other', label: '기타' },
];

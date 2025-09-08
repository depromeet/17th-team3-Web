export const MOOD_OPTIONS = [
  '어떤 분위기든 좋아요!',
  '오늘은 간단히, 빨리 먹고 싶어요',
  '배부르게 든든하게 먹고 싶어요',
  '술안주랑 함께, 한잔하는 자리가 좋아요',
  '기타',
] as const;

export const CUISINE_OPTIONS = ['다 괜찮아요!', '한식', '양식', '일식', '중식', '기타'] as const;

export const TASTE_OPTIONS = [
  '다 괜찮아요!',
  '자극적이고 매운 맛',
  '담백 깔끔한 맛',
  '기타',
] as const;

export const AVOID_INGREDIENT_OPTIONS = [
  '없어요!',
  '채식주의',
  '글루텐프리',
  '견과류',
  '해산물',
  '유제품',
  '기타',
] as const;

export const UNWANTED_MENU_OPTIONS = [
  '없어요!',
  '회, 날 것',
  '내장, 특수부위',
  '매운 음식',
  '기타',
] as const;

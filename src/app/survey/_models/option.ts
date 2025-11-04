/**
 * 옵션 정의(정적 테이블)
 * - id 규칙: `${domain}:${name}` (ex. 'c:korean', 'c:any')
 * - 화면에는 label만 노출, 로직/저장은 id 사용
 */
export interface Option {
  id: string;
  label: string;
}

/** 음식 카테고리 옵션
 * - 'c:any'는 '다 괜찮아요!' (배타 옵션; 단독 선택)
 * - 화면에서 칩으로 렌더링
 */
export const CUISINE_OPTIONS = [
  { id: 'c:any', label: '다 괜찮아요!' },
  { id: 'c:korean', label: '한식' },
  { id: 'c:japanese', label: '일식' },
  { id: 'c:chinese', label: '중식' },
  { id: 'c:western', label: '양식' },
  { id: 'c:southeast', label: '기타 해외 음식' },
] as const satisfies ReadonlyArray<Option>;

/** 음식 카테고리 옵션 (데이터 모델 확장) */
export const CUISINE_DETAIL_MAP = {
  korean: [
    { id: 'd:korean:rice', label: '밥류' },
    { id: 'd:korean:grill', label: '구이·조림류' },
    { id: 'd:korean:soup', label: '국·탕·찌개류' },
    { id: 'd:korean:snack', label: '분식' },
    { id: 'd:korean:pancake', label: '전·부침류' },
  ],
  chinese: [
    { id: 'd:chinese:noodle', label: '면류' },
    { id: 'd:chinese:rice', label: '밥류' },
    { id: 'd:chinese:fry', label: '튀김·볶음류' },
    { id: 'd:chinese:dimsum', label: '딤섬·만두류' },
    { id: 'd:chinese:soup', label: '국물요리' },
  ],
  western: [
    { id: 'd:western:pasta', label: '파스타' },
    { id: 'd:western:steak', label: '스테이크' },
    { id: 'd:western:pizza', label: '피자' },
    { id: 'd:western:salad', label: '샐러드·샌드위치' },
    { id: 'd:western:risotto', label: '리조토' },
  ],
  japanese: [
    { id: 'd:japanese:sushi', label: '초밥·사시미' },
    { id: 'd:japanese:rice', label: '밥류' },
    { id: 'd:japanese:noodle', label: '면류' },
    { id: 'd:japanese:fry', label: '튀김·구이류' },
    { id: 'd:japanese:hotpot', label: '탕·나베류' },
  ],
  southeast: [
    { id: 'd:southeast:vietnam', label: '베트남 음식' },
    { id: 'd:southeast:mexican', label: '멕시코 음식' },
    { id: 'd:southeast:indian', label: '인도 음식' },
    { id: 'd:southeast:thai', label: '태국 음식' },
  ],
} as const;

export const CUISINE_CATEGORY_LABELS = {
  korean: '한식',
  chinese: '중식',
  western: '양식',
  japanese: '일식',
  southeast: '기타 해외 음식',
} as const;

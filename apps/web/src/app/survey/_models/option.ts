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
  { id: 'c:vietnamese', label: '베트남 음식' },
  { id: 'c:mexican', label: '멕시칸' },
  { id: 'c:indian', label: '인도 음식' },
  { id: 'c:thai', label: '태국 음식' },
  { id: 'c:school', label: '분식' },
] as const satisfies ReadonlyArray<Option>;

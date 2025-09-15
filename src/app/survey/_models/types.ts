/** src/app/survey/_models/types.ts */
/** 타입 정의 모듈
 * - 스텝 키, 공용 컨텍스트(CommonCtx), 결과 타입
 * - CommonCtx: 모든 선택은 "id 배열", '기타' 텍스트는 스텝 키로 구분 저장
 */

export type RoleLabel = '참여자' | '주최자';

export const STEP_KEYS = ['Mood', 'Cuisine', 'Taste', 'AvoidIngredient', 'UnwantedMenu'] as const;
export type StepKey = (typeof STEP_KEYS)[number];

/** 설문 컨텍스트: 선택은 id 배열, '기타' 텍스트는 스텝별로 분리 보관 */
export interface CommonCtx {
  moodsIds: string[];
  cuisinesIds: string[];
  tastesIds: string[];
  avoidIngredientsIds: string[];
  unwantedMenusIds: string[];

  /** 스텝별 '기타' 입력값 */
  others: Partial<Record<StepKey, string>>;
}

/** useFunnel이 기대하는 타입: "스텝키 → 컨텍스트" 매핑 */
export type FunnelCtxMap = Record<StepKey, CommonCtx>;

/** 설문 종료 시 수집되는 전체 결과 */
export type SurveyResult = CommonCtx;

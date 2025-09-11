export type RoleLabel = '참여자' | '주최자';

export const STEP_KEYS = ['Mood', 'Cuisine', 'Taste', 'AvoidIngredient', 'UnwantedMenu'] as const;
export type StepKey = (typeof STEP_KEYS)[number];

/** 설문 컨텍스트: 선택은 id 배열, '기타' 텍스트는 스텝별로 분리 보관 */
export type CommonCtx = {
  moodsIds: string[];
  cuisinesIds: string[];
  tastesIds: string[];
  avoidIngredientsIds: string[];
  unwantedMenusIds: string[];

  /** 스텝별 '기타' 입력값 */
  others: Partial<Record<StepKey, string>>;
};

/** useFunnel이 기대하는 타입: "스텝키 → 컨텍스트" 매핑 */
export type FunnelCtxMap = Record<StepKey, CommonCtx>;

export type SurveyResult = CommonCtx;

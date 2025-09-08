export type RoleLabel = '참여자' | '주최자';

export const STEP_KEYS = ['Mood', 'Cuisine', 'Taste', 'AvoidIngredient', 'UnwantedMenu'] as const;
export type StepKey = (typeof STEP_KEYS)[number];

export type MoodOption = (typeof import('./options').MOOD_OPTIONS)[number];
export type CuisineOption = (typeof import('./options').CUISINE_OPTIONS)[number];
export type TasteOption = (typeof import('./options').TASTE_OPTIONS)[number];
export type AvoidIngredientOption = (typeof import('./options').AVOID_INGREDIENT_OPTIONS)[number];
export type UnwantedMenuOption = (typeof import('./options').UNWANTED_MENU_OPTIONS)[number];

export type CommonCtx = {
  moods: MoodOption[];
  cuisines: CuisineOption[];
  tastes: TasteOption[];
  avoidIngredients: AvoidIngredientOption[];
  unwantedMenus: UnwantedMenuOption[];
};

export type FunnelCtxMap = Record<StepKey, CommonCtx>;
export type SurveyResult = CommonCtx; // 마지막 스텝 완료 시 수집되는 전체 결과

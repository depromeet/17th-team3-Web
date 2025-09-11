import type { Option } from './option';

export type RoleLabel = '참여자' | '주최자';

export const STEP_KEYS = ['Mood', 'Cuisine', 'Taste', 'AvoidIngredient', 'UnwantedMenu'] as const;
export type StepKey = (typeof STEP_KEYS)[number];

export type MoodOption = Option;
export type CuisineOption = Option;
export type TasteOption = Option;
export type AvoidIngredientOption = Option;
export type UnwantedMenuOption = Option;

export type CommonCtx = {
  moods: MoodOption[];
  cuisines: CuisineOption[];
  tastes: TasteOption[];
  avoidIngredients: AvoidIngredientOption[];
  unwantedMenus: UnwantedMenuOption[];
};

export type FunnelCtxMap = Record<StepKey, CommonCtx>;
export type SurveyResult = CommonCtx;

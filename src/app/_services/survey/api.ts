import { api } from '@/app/_lib/api';

import type { FoodCategoryResponse } from '@/app/survey/_models/types';

export const surveyApi = {
  /** 음식 카테고리 조회 */
  getSurveyCategories: (query?: string) =>
    api.get<FoodCategoryResponse>('/survey-categories', {
      params: query ? { q: query } : undefined,
    }),
} as const;

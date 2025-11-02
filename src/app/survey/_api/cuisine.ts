import { api } from '@/app/_lib/api';
import { FoodCategoryResponse } from '@/app/survey/_models/types';

export const surveyApi = {
  getSurveyCategories: (query?: string) =>
    api.get<FoodCategoryResponse[]>('/survey-categories', {
      params: query ? { q: query } : undefined,
    }),
} as const;

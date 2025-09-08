'use client';

import { useFunnel } from '@use-funnel/browser';

import type { FunnelCtxMap, SurveyResult } from '../_models/types';

export const useSurveyFunnel = (initial?: Partial<SurveyResult>) => {
  return useFunnel<FunnelCtxMap>({
    id: 'lunch-survey',
    initial: {
      step: 'Mood',
      context: {
        moods: initial?.moods ?? [],
        cuisines: initial?.cuisines ?? [],
        tastes: initial?.tastes ?? [],
        avoidIngredients: initial?.avoidIngredients ?? [],
        unwantedMenus: initial?.unwantedMenus ?? [],
      },
    },
  });
};

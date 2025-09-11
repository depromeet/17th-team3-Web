'use client';

import { useFunnel } from '@use-funnel/browser';

import type { CommonCtx, FunnelCtxMap } from '../_models/types';

export const useSurveyFunnel = (initial?: Partial<CommonCtx>) => {
  return useFunnel<FunnelCtxMap>({
    id: 'survey',
    initial: {
      step: 'Mood',
      context: {
        moodsIds: initial?.moodsIds ?? [],
        cuisinesIds: initial?.cuisinesIds ?? [],
        tastesIds: initial?.tastesIds ?? [],
        avoidIngredientsIds: initial?.avoidIngredientsIds ?? [],
        unwantedMenusIds: initial?.unwantedMenusIds ?? [],
        others: initial?.others ?? {},
      },
    },
  });
};

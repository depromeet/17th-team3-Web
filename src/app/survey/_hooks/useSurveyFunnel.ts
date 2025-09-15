'use client';

import { useFunnel } from '@use-funnel/browser';

import type { CommonCtx, FunnelCtxMap } from '../_models/types';

/**
 * useSurveyFunnel
 * - useFunnel 래퍼 훅
 * - 스텝/컨텍스트 초기화와 제네릭 타입을 한 곳에서 통일
 * - (필요 시) 이곳에서 로컬스토리지/URL 동기화 같은 영속화를 추가 가능
 */
export const useSurveyFunnel = (initial?: Partial<CommonCtx>) => {
  return useFunnel<FunnelCtxMap>({
    id: 'survey',
    initial: {
      step: 'Mood',
      context: {
        // 각 스텝 선택은 id 배열로 관리
        moodsIds: initial?.moodsIds ?? [],
        cuisinesIds: initial?.cuisinesIds ?? [],
        tastesIds: initial?.tastesIds ?? [],
        avoidIngredientsIds: initial?.avoidIngredientsIds ?? [],
        unwantedMenusIds: initial?.unwantedMenusIds ?? [],
        // 스텝별 '기타' 입력값
        others: initial?.others ?? {},
      },
    },
  });
};

'use client';

import { useFunnel } from '@use-funnel/browser';

import type { CommonCtx, FunnelCtxMap } from '@/app/survey/_models/types';

/** useFunnel
 * - 현재 스텝과 공용 컨텍스트를 초기화
 * - (필요 시) 여기서 로컬스토리지/URL 동기화 같은 영속화 추가 가능
 */
export const useSurveyFunnel = (initial?: Partial<CommonCtx>) => {
  return useFunnel<FunnelCtxMap>({
    id: 'survey', // 동일 ID면 히스토리/복원 등에 활용 가능
    initial: {
      step: 'Name',
      context: {
        role: initial?.role ?? '참여자',
        name: initial?.name ?? '',
        profileKey: initial?.profileKey ?? 'default',
        preferCuisineIds: initial?.preferCuisineIds ?? [],
        dislikeCuisineIds: initial?.dislikeCuisineIds ?? [],
        others: initial?.others ?? {},
        hostFlags: initial?.hostFlags ?? {
          enableCuisineBranch: false, // 추후 on
        },
      },
    },
  });
};

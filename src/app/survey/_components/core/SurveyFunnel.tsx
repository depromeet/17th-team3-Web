'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { FOOD_MAP } from '@/app/_constants/menu';
import SurveyLayout from '@/app/survey/_components/core/SurveyLayout';
import KoreanFollowUpStep from '@/app/survey/_components/step/KoreanFollowUpStep';
import SurveyCuisineStep from '@/app/survey/_components/step/SurveyCuisineStep';
import SurveyNameStep from '@/app/survey/_components/step/SurveyNameStep';
import SurveyReviewStep from '@/app/survey/_components/step/SurveyReviewStep';
import { useSurveyFunnel } from '@/app/survey/_hooks/useSurveyFunnel';
import {
  SURVEY_TOTAL_STEPS,
  stepKeyToIndex,
  getPrevStepKey,
  ANY_ID,
} from '@/app/survey/_models/constants';
import { CUISINE_OPTIONS, type Option } from '@/app/survey/_models/option';
import { type RoleLabel, type SurveyResult } from '@/app/survey/_models/types';

import type { ChipOption } from '@/app/survey/_components/ui/ChipGroupMultiSelect';

/* -------------------------------------------
 * 유틸리티
 * ----------------------------------------- */

// 음식 id → FOOD_MAP key 매핑
const ID_TO_FOOD_KEY: Record<string, keyof typeof FOOD_MAP> = {
  'c:korean': 'korean',
  'c:japanese': 'japanese',
  'c:chinese': 'chinese',
  'c:western': 'western',
  'c:vietnamese': 'vietnamese',
  'c:mexican': 'mexican',
  'c:indian': 'indian',
  'c:thai': 'thai',
  'c:school': 'bunsik',
};

// Option[] → ChipOption[] 변환 (아이콘 포함)
const toChipOptions = (opts: ReadonlyArray<Option>): ChipOption[] =>
  opts.map((o) => {
    if (o.id === ANY_ID) {
      return { id: o.id, label: o.label, variant: 'any' as const, startIcon: null };
    }
    const key = ID_TO_FOOD_KEY[o.id];
    const src = key ? FOOD_MAP[key].imageSrc : undefined;
    return {
      id: o.id,
      label: o.label,
      variant: 'cuisine' as const,
      startIcon: src ? <Image src={src} alt={o.label} width={20} height={20} /> : null,
    };
  });

// 선택된 id 목록에서 원본 옵션 추출
const pickOptions = (ids: string[], all: ReadonlyArray<Option>) =>
  all.filter((o) => ids.includes(o.id));

/* -------------------------------------------
 * 컴포넌트
 * ----------------------------------------- */

export interface SurveyFunnelProps {
  role: RoleLabel;
  initial?: Partial<SurveyResult>;
  onComplete?: (r: SurveyResult) => void;
}

/**
 * SurveyFunnel
 * - 퍼널 오케스트레이터
 * - 현재 step/context/history를 기반으로 해당 Step 컴포넌트를 렌더링
 * - '다 괜찮아요!'(c:any)는 배타 옵션 → 단독 선택
 * - 비선호 단계는 선호 음식 제외 후 렌더링
 */
const SurveyFunnel = ({ role, initial, onComplete }: SurveyFunnelProps) => {
  const { step, context, history } = useSurveyFunnel({ ...initial, role });
  const stepValue = stepKeyToIndex(step); // 1-based step index
  const router = useRouter(); // 라우터 훅 사용

  // 공통 뒤로가기 핸들러
  const handleBack = () => {
    if (step === 'Name') {
      // 임시: SurveyNameStep에서 "이전" → meeting/1 이동
      router.push('/meetings/1');
      return;
    }
    history.replace(getPrevStepKey(step), (p) => p);
  };

  /* -------------------------------------------
   * 스텝 분기 처리
   * ----------------------------------------- */

  switch (step) {
    case 'Name':
      return (
        <SurveyLayout stepValue={stepValue} totalSteps={SURVEY_TOTAL_STEPS} onBack={handleBack}>
          <SurveyNameStep
            initialValue={context.name}
            onCancel={handleBack}
            onNext={(name) => history.push('PreferCuisine', (prev) => ({ ...prev, name }))}
          />
        </SurveyLayout>
      );

    case 'PreferCuisine': {
      const options = toChipOptions(CUISINE_OPTIONS);
      return (
        <SurveyLayout stepValue={stepValue} totalSteps={SURVEY_TOTAL_STEPS} onBack={handleBack}>
          <SurveyCuisineStep
            title={`어떤 종류의 음식을\n선호하시나요?`}
            roleLabel={context.role}
            options={options}
            defaultSelectedIds={context.preferCuisineIds}
            exclusiveIds={[ANY_ID]}
            onCancel={handleBack}
            onNext={(ids) => {
              // '다 괜찮아요' 선택 시 → 단독 유지
              const nextIds = ids.includes(ANY_ID) ? [ANY_ID] : ids;
              history.push('DislikeCuisine', (prev) => ({ ...prev, preferCuisineIds: nextIds }));
            }}
          />
        </SurveyLayout>
      );
    }

    case 'DislikeCuisine': {
      // 선호가 '다 괜찮아요'라면 전체 허용 → 제외 없음
      const excluded = context.preferCuisineIds.includes(ANY_ID) ? [] : context.preferCuisineIds;
      const dislikeCandidates: Option[] = [
        CUISINE_OPTIONS.find((o) => o.id === ANY_ID)!, // 항상 존재
        ...CUISINE_OPTIONS.filter((o) => o.id !== ANY_ID && !excluded.includes(o.id)),
      ];
      const options = toChipOptions(dislikeCandidates);

      return (
        <SurveyLayout stepValue={stepValue} totalSteps={SURVEY_TOTAL_STEPS} onBack={handleBack}>
          <SurveyCuisineStep
            title={`혹시 피하는 종류의 음식이\n있나요?`}
            roleLabel={context.role}
            options={options}
            defaultSelectedIds={context.dislikeCuisineIds}
            exclusiveIds={[ANY_ID]}
            onCancel={handleBack}
            onNext={(ids) =>
              history.push('Review', (prev) => ({ ...prev, dislikeCuisineIds: ids }))
            }
          />
        </SurveyLayout>
      );
    }

    case 'Review': {
      const prefer = pickOptions(context.preferCuisineIds, CUISINE_OPTIONS).map((o) => ({
        ...o,
        iconSrc: FOOD_MAP[ID_TO_FOOD_KEY[o.id]]?.imageSrc,
      }));
      const dislike = pickOptions(context.dislikeCuisineIds, CUISINE_OPTIONS).map((o) => ({
        ...o,
        iconSrc: FOOD_MAP[ID_TO_FOOD_KEY[o.id]]?.imageSrc,
      }));

      return (
        <SurveyLayout
          stepValue={stepValue}
          totalSteps={SURVEY_TOTAL_STEPS}
          onBack={handleBack}
          className="background-2"
        >
          <SurveyReviewStep
            roleLabel={context.role}
            name={context.name}
            prefer={prefer}
            dislike={dislike}
            onCancel={handleBack}
            onSubmit={() => {
              // 조건부 분기 (한식 추가 설문)
              if (
                context.hostFlags?.enableCuisineBranch &&
                context.preferCuisineIds.includes('c:korean')
              ) {
                history.push('KoreanFollowUp', (p) => p);
                return;
              }
              // 최종 완료 → SurveyClient에서 router.push('/survey/complete') 처리
              onComplete?.({ ...context });
            }}
            nextButtonText="저장하기"
            prevButtonText="이전"
          />
        </SurveyLayout>
      );
    }

    case 'KoreanFollowUp':
      return (
        <SurveyLayout
          stepValue={stepValue}
          totalSteps={SURVEY_TOTAL_STEPS}
          onBack={() => history.replace('Review', (p) => p)}
          title="한식 추가 설문"
        >
          <KoreanFollowUpStep
            onCancel={() => history.replace('Review', (p) => p)}
            onNext={() => {
              // 최종 완료 → SurveyClient에서 router.push('/survey/complete') 처리
              onComplete?.({ ...context });
            }}
          />
        </SurveyLayout>
      );

    default:
      // fallback (잘못된 step일 경우)
      return null;
  }
};

export default SurveyFunnel;

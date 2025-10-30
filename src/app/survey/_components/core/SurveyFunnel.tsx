'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { FOOD_MAP } from '@/app/_constants/menu';
import SurveyLayout from '@/app/survey/_components/core/SurveyLayout';
import KoreanFollowUpStep from '@/app/survey/_components/step/KoreanFollowUpStep';
import SurveyCuisineStepV2 from '@/app/survey/_components/step/SurveyCuisineStepV2';
import SurveyNameStep from '@/app/survey/_components/step/SurveyNameStep';
import SurveyReviewStep from '@/app/survey/_components/step/SurveyReviewStep';
import ConfirmModal from '@/app/survey/_components/ui/ConfirmModal';
import LoadingOverlay from '@/app/survey/_components/ui/LoadingOverlay';
import { useSurveyFunnel } from '@/app/survey/_hooks/useSurveyFunnel';
import {
  MAX_SELECT_COUNT,
  SURVEY_TOTAL_STEPS,
  stepKeyToIndex,
  getPrevStepKey,
  ANY_ID,
} from '@/app/survey/_models/constants';
import { CUISINE_OPTIONS, CUISINE_DETAIL_MAP, type Option } from '@/app/survey/_models/option';
import { type RoleLabel, type SurveyResult } from '@/app/survey/_models/types';
/* -------------------------------------------
 * 유틸리티
 * ----------------------------------------- */

// 음식 id → FOOD_MAP key 매핑
const ID_TO_FOOD_KEY: Record<string, keyof typeof FOOD_MAP> = {
  'c:korean': 'korean',
  'c:japanese': 'japanese',
  'c:chinese': 'chinese',
  'c:western': 'western',
  'c:southeast': 'southeast',
};

// CUISINE_DETAIL_MAP 포함한 전체 목록
const ALL_CUISINE_OPTIONS: Option[] = [
  ...CUISINE_OPTIONS,
  ...Object.values(CUISINE_DETAIL_MAP).flat(),
];

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
  const [isLoading, setIsLoading] = useState(false);

  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);

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
        <SurveyLayout
          stepValue={stepValue}
          totalSteps={SURVEY_TOTAL_STEPS}
          onBack={() => setIsSkipModalOpen(true)}
        >
          <SurveyNameStep
            initialValue={context.name}
            initialProfileKey={context.profileKey}
            onCancel={() => setIsSkipModalOpen(true)}
            onNext={({ name, profileKey }) =>
              history.push('PreferCuisine', (prev) => ({
                ...prev,
                name,
                profileKey,
              }))
            }
          />

          <ConfirmModal
            open={isSkipModalOpen}
            title="설문을 그만둘까요?"
            description="지금 나가면 입력된 내용이 사라져요."
            cancelText="계속하기"
            confirmText="나가기"
            onCancel={() => setIsSkipModalOpen(false)}
            onConfirm={() => {
              setIsSkipModalOpen(false);
              router.push('/meetings/1');
            }}
          />
        </SurveyLayout>
      );

    case 'PreferCuisine':
      return (
        <SurveyLayout
          stepValue={stepValue}
          totalSteps={SURVEY_TOTAL_STEPS}
          onBack={handleBack}
          showNextButton
          onRightClick={() => setIsSkipModalOpen(true)}
          rightLabel="건너뛰기"
        >
          <SurveyCuisineStepV2
            title={`좋아하는 음식을\n최대 5개까지 선택해주세요`}
            defaultSelectedIds={context.preferCuisineIds}
            // onNext={(ids) => {
            //   const nextIds = ids.includes(ANY_ID) ? [ANY_ID] : ids.slice(0, MAX_SELECT_COUNT);
            //   history.push('Review', (prev) => ({ ...prev, preferCuisineIds: nextIds }));
            // }}
            onCancel={handleBack}
          />

          {/* ConfirmModal 분리 적용 */}
          <ConfirmModal
            open={isSkipModalOpen}
            title="설문을 건너뛸까요?"
            cancelText="취소"
            confirmText="건너뛰기"
            onCancel={() => setIsSkipModalOpen(false)}
            onConfirm={async () => {
              setIsSkipModalOpen(false);
              setIsLoading(true);

              // 약간의 로딩 시간 후 이동
              await new Promise((r) => setTimeout(r, 1500));

              // ✅ ‘다 괜찮아요’로 overview 이동
              router.push(`/events/123/overview?selected=${encodeURIComponent('다 괜찮아요')}`);
            }}
          />
          {isLoading && <LoadingOverlay />}
        </SurveyLayout>
      );

    case 'Review': {
      const prefer = pickOptions(context.preferCuisineIds, ALL_CUISINE_OPTIONS).map((o) => ({
        ...o,
        iconSrc: FOOD_MAP[ID_TO_FOOD_KEY[o.id.split(':')[1]] as keyof typeof FOOD_MAP]?.imageSrc,
      }));
      const dislike = pickOptions(context.dislikeCuisineIds, ALL_CUISINE_OPTIONS).map((o) => ({
        ...o,
        iconSrc: FOOD_MAP[ID_TO_FOOD_KEY[o.id.split(':')[1]] as keyof typeof FOOD_MAP]?.imageSrc,
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

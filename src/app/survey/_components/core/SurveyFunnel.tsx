'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import SurveyLayout from '@/app/survey/_components/core/SurveyLayout';
import SurveyCuisineStepV2 from '@/app/survey/_components/step/SurveyCuisineStepV2';
import SurveyNameStep from '@/app/survey/_components/step/SurveyNameStep';
import ConfirmModal from '@/app/survey/_components/ui/ConfirmModal';
import LoadingOverlay from '@/app/survey/_components/ui/LoadingOverlay';
import { useSurveyFunnel } from '@/app/survey/_hooks/useSurveyFunnel';
import { getPrevStepKey, SURVEY_TOTAL_STEPS } from '@/app/survey/_models/constants';

import type { RoleLabel, SurveyResult } from '@/app/survey/_models/types';

/**
 * SurveyFunnel
 * - 설문 퍼널 전체 플로우를 제어하는 메인 오케스트레이터
 * - 현재 step 상태에 따라 해당 Step 컴포넌트를 렌더링
 * - 이름 입력 → 음식 선택 → (분기) 한식 추가 질문 → 완료
 */
const SurveyFunnel = ({
  role,
  initial,
  onComplete: _onComplete, // eslint 무시 없이 OK
}: {
  role: RoleLabel;
  initial?: Partial<SurveyResult>;
  onComplete?: (r: SurveyResult) => void;
}) => {
  const { step, context, history } = useSurveyFunnel({ ...initial, role });
  const router = useRouter();

  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /** 공통 뒤로가기 핸들러 */
  const handleBack = () => {
    // TODO: 모임방 임시 하드코딩 설정
    if (step === 'Name') return router.push('/meetings/1');
    history.replace(getPrevStepKey(step), (p) => p);
  };

  switch (step) {
    /** STEP 1: 이름/프로필 선택 */
    case 'Name':
      return (
        <SurveyLayout
          stepValue={1}
          totalSteps={SURVEY_TOTAL_STEPS}
          onBack={() => setIsSkipModalOpen(true)}
        >
          <SurveyNameStep
            initialValue={context.name}
            initialProfileKey={context.profileKey}
            onNext={({ name, profileKey }) =>
              history.push('PreferCuisine', (prev) => ({ ...prev, name, profileKey }))
            }
            onCancel={() => setIsSkipModalOpen(true)}
          />

          <ConfirmModal
            open={isSkipModalOpen}
            title="설문을 종료할까요?"
            description="입력한 내용이 저장되지 않습니다."
            cancelText="계속하기"
            confirmText="나가기"
            onCancel={() => setIsSkipModalOpen(false)}
            onConfirm={() => router.push('/meetings/1')}
          />
        </SurveyLayout>
      );

    /** STEP 2: 선호 음식 선택 */
    case 'PreferCuisine':
      return (
        <SurveyLayout
          stepValue={2}
          totalSteps={SURVEY_TOTAL_STEPS}
          onBack={handleBack}
          showNextButton
          rightLabel="건너뛰기"
          onRightClick={() => setIsSkipModalOpen(true)}
        >
          <SurveyCuisineStepV2
            title={`좋아하는 음식을\n최대 5개까지 선택해주세요`}
            defaultSelectedIds={context.preferCuisineIds}
            onCancel={handleBack}
          />

          <ConfirmModal
            open={isSkipModalOpen}
            title="건너뛰고 넘어갈까요?"
            description="선호 음식이 저장되지 않습니다."
            cancelText="취소"
            confirmText="건너뛰기"
            onCancel={() => setIsSkipModalOpen(false)}
            onConfirm={async () => {
              setIsLoading(true);
              await new Promise((r) => setTimeout(r, 1000));
              router.push(`/events/123/overview?selected=${encodeURIComponent('다 괜찮아요')}`);
              setIsLoading(false);
            }}
          />
          {isLoading && <LoadingOverlay />}
        </SurveyLayout>
      );

    default:
      return null;
  }
};

export default SurveyFunnel;

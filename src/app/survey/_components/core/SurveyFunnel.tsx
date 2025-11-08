'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@/app/_components/ui/Loading';
import { surveyApi } from '@/app/_services/survey/api';
import SurveyLayout from '@/app/survey/_components/core/SurveyLayout';
import SurveyCuisineStep from '@/app/survey/_components/step/SurveyCuisineStep';
import SurveyProfileStep from '@/app/survey/_components/step/SurveyProfileStep';
import ConfirmModal from '@/app/survey/_components/ui/modal/ConfirmModal';
import { useSurveyFunnel } from '@/app/survey/_hooks/useSurveyFunnel';
import { getPrevStepKey, SURVEY_TOTAL_STEPS } from '@/app/survey/_models/constants';

import type { RoleLabel, SurveyResult } from '@/app/survey/_models/types';

interface SurveyFunnelProps {
  role: RoleLabel;
  meetingId: number;
  initial?: Partial<SurveyResult>;
  onComplete?: (r: SurveyResult) => void;
}

/** SurveyFunnel
 * - 설문 퍼널 전체 플로우를 제어하는 핵심 오케스트레이터
 * - useSurveyFunnel Hook으로 현재 step/context/history를 관리
 * - step에 따라 다음 컴포넌트 렌더링:
 *   ① Name (프로필 입력)
 *   ② PreferCuisine (음식 선택)
 * - 추가 분기(예: 한식 세부 질문)는 이후 단계로 확장 가능
 *
 * State:
 * - isSkipModalOpen: 건너뛰기/나가기 모달 표시
 * - isLoading: API 호출 중 로딩 표시
 */

const SurveyFunnel = ({ role, meetingId, initial, onComplete: _onComplete }: SurveyFunnelProps) => {
  const { step, context, history } = useSurveyFunnel({ ...initial, role });
  const router = useRouter();

  const [isSkipModalOpen, setIsSkipModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /** 공통 뒤로가기 핸들러 */
  const handleBack = () => {
    if (step === 'Name') return router.push(`/meetings/${meetingId}`);
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
          <SurveyProfileStep
            initialValue={context.name}
            initialProfileKey={context.profileKey}
            onNext={({ name, profileKey }) =>
              history.push('PreferCuisine', (prev) => ({ ...prev, name, profileKey }))
            }
            onCancel={() => setIsSkipModalOpen(true)}
            meetingId={meetingId}
          />

          <ConfirmModal
            open={isSkipModalOpen}
            title="설문을 종료할까요?"
            description="입력한 내용이 저장되지 않습니다."
            cancelText="계속하기"
            confirmText="나가기"
            onCancel={() => setIsSkipModalOpen(false)}
            onConfirm={() => router.push(`/meetings/${meetingId}`)}
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
          <SurveyCuisineStep
            title={`좋아하는 음식을\n최대 5개까지 선택해주세요`}
            defaultSelectedIds={context.preferCuisineIds}
            onCancel={handleBack}
            context={context}
            history={history}
            meetingId={meetingId}
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
              try {
                await surveyApi.postSurveyResult(meetingId, [3]); // '다 괜찮아요'
                router.push(
                  `/events/${meetingId}/overview?selected=${encodeURIComponent('다 괜찮아요')}`
                );
              } finally {
                setIsLoading(false);
              }
            }}
          />
          {isLoading && <Loading />}
        </SurveyLayout>
      );

    default:
      return null;
  }
};

export default SurveyFunnel;

/** src/app/survey/_components/steps/KoreanFollowUpStep.tsx */
'use client';

import { cn } from '@/app/_lib/cn';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';

export interface KoreanFollowUpStepProps {
  /** 이전으로 */
  onCancel: () => void;
  /** 완료로 이동 (후속 저장/라우팅은 부모에서) */
  onNext: () => void;
  /** (옵션) 타이틀/설명 커스터마이즈 */
  title?: string;
  description?: string;
}

/**
 * 한식 분기 스텝
 * - meetings의 StepFormLayout UI를 그대로 사용
 * - 실제 문항(UI)은 children 자리에 점진적으로 추가 예정
 */
const KoreanFollowUpStep = ({
  onCancel,
  onNext,
  title = '한식 선호 상세 질문 (준비 중)',
  description = '추후 분기 설문이 여기에 들어갑니다.',
}: KoreanFollowUpStepProps) => {
  return (
    <StepFormLayout
      title={title}
      description={description}
      onCancel={onCancel}
      onNext={onNext}
      prevButtonText="이전"
      nextButtonText="완료로 이동"
    >
      {/* TODO: 추후 한식 관련 세부 문항(칩/라디오/텍스트 등)을 여기 children 영역에 추가 */}
      <div className={cn('mx-auto max-w-[480px] px-1 pt-1 pb-2 text-neutral-700')}>
        예시) 매운 정도, 국/탕 vs 구이, 선호 반찬, 가격대, 거리 등
      </div>
    </StepFormLayout>
  );
};

export default KoreanFollowUpStep;

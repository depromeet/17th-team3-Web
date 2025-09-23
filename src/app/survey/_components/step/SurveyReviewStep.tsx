/** src/app/survey/_components/steps/SurveyReviewStep.tsx */
'use client';

import { cn } from '@/app/_lib/cn';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';

import type { Option } from '@/app/survey/_models/option';

export interface SurveyReviewStepProps {
  roleLabel: string;
  name: string;
  prefer: Option[];
  dislike: Option[];
  onCancel: () => void; // 이전으로
  onSubmit: () => void; // 완료/분기
  title?: string;
  description?: string;
  nextButtonText?: string;
  prevButtonText?: string;
}

const Pill = ({
  children,
  tone = 'blue',
}: {
  children: React.ReactNode;
  tone?: 'blue' | 'gray';
}) => (
  <span
    className={cn(
      'rounded-full px-3 py-1 text-sm',
      tone === 'blue' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
    )}
  >
    {children}
  </span>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section>
    <h2 className="mb-2 text-sm font-semibold text-gray-700">{label}</h2>
    {children}
  </section>
);

/**
 * 리뷰/확인 스텝 (meetings StepFormLayout 스타일)
 * - 상단 타이틀/설명 + 하단 ‘이전/완료’ 버튼을 공용 레이아웃으로 제공
 * - 가운데 본문은 요약 정보(이름, 선호/비선호 칩) 표시
 */
const SurveyReviewStep = ({
  roleLabel,
  name,
  prefer,
  dislike,
  onCancel,
  onSubmit,
  title = '이대로 저장할까요?',
  description = '저장하면 수정할 수 없어요.',
  nextButtonText = '저장하기',
  prevButtonText = '이전',
}: SurveyReviewStepProps) => {
  return (
    <StepFormLayout
      title={title}
      description={description ?? `${roleLabel} 설문 요약`}
      onCancel={onCancel}
      onNext={onSubmit}
      prevButtonText={prevButtonText}
      nextButtonText={nextButtonText}
    >
      <div className="mx-auto max-w-[480px] space-y-4 px-1 pt-1 pb-4">
        <Row label="이름">
          <div className="rounded-xl border px-4 py-3">{name}</div>
        </Row>

        <Row label="선호하는 음식">
          <div className="flex flex-wrap gap-2">
            {prefer.length > 0 ? (
              prefer.map((o) => <Pill key={o.id}>{o.label}</Pill>)
            ) : (
              <span className="text-sm text-neutral-500">선택 없음</span>
            )}
          </div>
        </Row>

        <Row label="선호하지 않는 음식">
          <div className="flex flex-wrap gap-2">
            {dislike.length > 0 ? (
              dislike.map((o) => (
                <Pill key={o.id} tone="gray">
                  {o.label}
                </Pill>
              ))
            ) : (
              <span className="text-sm text-neutral-500">선택 없음</span>
            )}
          </div>
        </Row>
      </div>
    </StepFormLayout>
  );
};

export default SurveyReviewStep;

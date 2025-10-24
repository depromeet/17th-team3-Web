'use client';

import Image from 'next/image';

import { cn } from '@/app/_lib/cn';
import StepFormLayout from '@/app/survey/_components/ui/StepFormLayout';

import type { Option } from '@/app/survey/_models/option';

export interface ReviewOption extends Option {
  iconSrc?: string; // 음식 아이콘 경로
}

export interface SurveyReviewStepProps {
  roleLabel: string;
  name: string;
  profileKey?: string;
  prefer: ReviewOption[];
  dislike: ReviewOption[];
  onCancel: () => void;
  onSubmit: () => void;
  title?: string;
  description?: string;
  nextButtonText?: string;
  prevButtonText?: string;
}

/** 칩 (리뷰 전용 스타일) */
const Chip = ({ children, iconSrc }: { children: React.ReactNode; iconSrc?: string }) => {
  const base =
    'inline-flex h-7 items-center gap-1 rounded-full px-2.5 pr-3 text-sm font-semibold bg-neutral-200 text-orange-900';

  return (
    <span className={cn(base)}>
      {iconSrc && (
        <Image src={iconSrc} alt="" width={20} height={20} className="h-5 w-5 shrink-0" />
      )}
      {children}
    </span>
  );
};

/** 라벨 + 컨텐츠 묶음 */
const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="body-3 font-semibold text-orange-900">{label}</h2>
    {children}
  </section>
);

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
      {/* 아웃카드 */}
      <div className="mx-auto flex w-full max-w-md flex-1">
        <div
          className={cn('mb-8 flex flex-1 flex-col gap-7 rounded-2xl bg-white px-5 pt-4')}
          style={{ boxShadow: '0px 4px 12px rgba(250,165,148,0.5)' }}
        >
          <div className="space-y-7">
            {/* 이름 + 프로필 */}
            <div className="flex items-center gap-4">
              <div
                className="grid h-12 w-12 place-items-center rounded-md bg-white"
                style={{ border: '0.666px solid #9BA3B0' }}
              >
                <Image
                  src="/icons/profiles/susi.svg"
                  alt="프로필"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
              </div>
              <p className="font-semibold text-neutral-1500">{name || '이름 없음'}</p>
            </div>

            {/* 선호 음식 */}
            <Row label="선호하는 음식">
              <div className="flex flex-wrap gap-3">
                {prefer?.length ? (
                  prefer.map((o) => (
                    <Chip key={o.id} iconSrc={o.iconSrc}>
                      {o.label}
                    </Chip>
                  ))
                ) : (
                  <span className="text-sm text-neutral-500">선택 없음</span>
                )}
              </div>
            </Row>

            {/* 못 먹는 음식 */}
            <Row label="못 먹는 음식">
              <div className="flex flex-wrap gap-3 pb-16">
                {dislike?.length ? (
                  dislike.map((o) => (
                    <Chip key={o.id} iconSrc={o.iconSrc}>
                      {o.label}
                    </Chip>
                  ))
                ) : (
                  <span className="text-sm text-neutral-500">선택 없음</span>
                )}
              </div>
            </Row>
          </div>

          {/*<div style={{ height: 76 }} />*/}
        </div>
      </div>
    </StepFormLayout>
  );
};

export default SurveyReviewStep;

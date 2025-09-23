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

/** Figma 칩 스펙: 28px 높이, 좌:8 / 우:12 / 위아래:4, 반경 14px, 아이콘 20x20, 라벨 14/22 */
const Chip = ({
  children,
  tone = 'orange',
  withIcon = false,
}: {
  children: React.ReactNode;
  tone?: 'orange' | 'gray';
  withIcon?: boolean;
}) => {
  const base = 'inline-flex h-[28px] items-center rounded-14 px-3 pr-[12px] pl-2 gap-[4px]';
  const colors =
    tone === 'orange'
      ? 'bg-neutral-200 text-orange-900' // 배경 neutral-gray-200, 텍스트 saturated-orange-900
      : 'bg-neutral-200 text-neutral-1500/70';

  return (
    <span className={cn(base, colors, 'rounded-xl')}>
      {withIcon && (
        <svg width="20" height="20" viewBox="0 0 20 20" className="shrink-0" aria-hidden>
          <circle cx="10" cy="10" r="9" stroke="#5C1700" strokeWidth="2" fill="none" />
        </svg>
      )}
      <p className="label-1 font-semibold">{children}</p>
    </span>
  );
};

/** 라벨 + 콘텐츠 묶음 */
const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <section className="space-y-3">
    <h2 className="text-[16px] leading-[24px] font-semibold text-[#5C1700]">{label}</h2>
    {children}
  </section>
);

/**
 * 리뷰/확인 스텝
 * - 가운데 카드: 335x328(모바일 기준) 박스, #FFF, radius 16, 맞춤 그림자
 * - 상단 행: 이름(텍스트) + 오른쪽 프로필 박스(48x48, 0.666px 보더)
 * - 선호/비선호 칩: 12px 간격, 오렌지/그레이 톤
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
      {/* 아웃카드: 335x328, p: top16 right/left 20 bottom24, bg #FFF, radius 16, 커스텀 섀도우 */}
      <div className="mx-auto">
        <div
          className={cn(
            'mx-auto h-[328px] rounded-2xl bg-white',
            'px-5 pt-4 pb-6'
            // spot/ambient 색감을 근접 재현한 box-shadow (FAA594 50%)
            // 필요시 tailwind 플러그인으로 추출 가능
          )}
          style={{
            boxShadow: '0px 12px 24px rgba(250,165,148,0.5), 0px 0px 0px 1px rgba(250,165,148,0.1)',
          }}
        >
          {/* 내부 컬럼: 상단->이름행 -> 선호 -> 비선호 (간격 28) */}
          <div className="flex h-full flex-col gap-7">
            {/* 2. 이름 프레임: pt-16 px-20 pb-264는 상위 카드 패딩으로 해결됨.
                행 오른쪽에 프로필 48x48, 0.666px 보더, 8px radius */}
            <div className="flex items-center gap-4">
              {/* 프로필 박스 */}
              <div className="relative">
                <div
                  className={cn(
                    'h-[48px] w-[48px] rounded-[8px] bg-white',
                    'grid place-items-center'
                  )}
                  style={{
                    border: '0.66667px solid #9BA3B0', // neutral-gray-600
                    padding: '0.66667px',
                  }}
                >
                  {/* 프로필 아이콘 자리 */}
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="opacity-70"
                  >
                    <circle cx="12" cy="8" r="4" fill="#9BA3B0" />
                    <rect x="4" y="14" width="16" height="7" rx="3.5" fill="#9BA3B0" />
                  </svg>
                </div>
              </div>

              {/* 이름: py-8, 프로필로부터 pl-12 → 행 정렬로 자연스럽게 확보 */}
              <div className="py-2">
                <p className="body-1 font-semibold text-neutral-1500">{name || '이름 없음'}</p>
              </div>
            </div>

            {/* 3. 선호하는 음식 */}
            <Row label="선호하는 음식">
              <div className="flex flex-wrap gap-3">
                {prefer?.length ? (
                  prefer.map((o) => (
                    <Chip key={o.id} tone="orange" withIcon>
                      {o.label}
                    </Chip>
                  ))
                ) : (
                  <span className="text-sm text-neutral-500">선택 없음</span>
                )}
              </div>
            </Row>

            {/* 4. 못 먹는 것 (3과 동일 레이아웃, 톤만 그레이) */}
            <Row label="못 먹는 것">
              <div className="flex flex-wrap gap-3">
                {dislike?.length ? (
                  dislike.map((o) => (
                    <Chip key={o.id} tone="gray" withIcon>
                      {o.label}
                    </Chip>
                  ))
                ) : (
                  <span className="text-sm text-neutral-500">선택 없음</span>
                )}
              </div>
            </Row>
          </div>
        </div>
      </div>
    </StepFormLayout>
  );
};

export default SurveyReviewStep;

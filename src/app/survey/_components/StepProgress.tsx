'use client';

import { cn } from '@/app/_lib/cn';

export interface StepProgressProps {
  /** 전체 스텝 수 (1 이상) */
  total: number;
  /** 현재 스텝(0-based). active 이하를 "채움" 처리 */
  active: number;
  className?: string;
}

/** 진행 바
 * - {total}개의 얇은 선을 나열하고, active 이하를 강조(#FF4F14)
 * - CSS Grid로 균등 분할; 좌우 패딩 20px은 요구사항을 그대로 반영
 * - 스크린리더용 progressbar 정보 제공
 */
const StepProgress = ({ total, active, className }: StepProgressProps) => {
  // 접근성: 진행률(%) 계산 (active는 0-based이므로 +1 보정)
  const completed = Math.min(Math.max(active, 0), total - 1) + 1;
  const percent = Math.round((completed / total) * 100);

  return (
    <div
      className={cn('mx-auto w-full', className)}
      // 좌우 패딩을 px로 직접 주어 "375 - 40 = 335px" 유효 폭 확보
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <div
        className="grid w-full"
        style={{
          // n등분. gap과 함께 각 바 너비가 자동 계산됨
          gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))`,
          gap: 8,
        }}
        role="group"
        aria-label="progress segments"
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            // height:0 + border-top = 얇은 선(벡터) 스타일
            className="h-0 border-t"
            style={{
              borderTopWidth: 4,
              borderColor: i <= active ? '#FF4F14' : 'rgba(0,0,0,0.12)',
              opacity: 1, // 명시적으로 1
            }}
            aria-hidden
          />
        ))}
      </div>

      {/* SR 전용 진행바 스냅샷 */}
      <span
        className="sr-only"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        {percent}% completed
      </span>
    </div>
  );
};

export default StepProgress;

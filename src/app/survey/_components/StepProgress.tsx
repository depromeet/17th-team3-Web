/**
 * StepProgress
 * - 상단 진행 지시자 (indicate)
 * - 요구 스타일:
 *   - color: #FF4F14
 *   - width: 335px 고정 (컨테이너는 중앙 정렬)
 *   - height: 8px
 *   - angle: 0deg (단색이므로 실질 영향 없음)
 *   - opacity: 1
 */
'use client';

import clsx from 'clsx';

type Props = {
  total: number; // 전체 스텝 수
  active: number; // 현재 스텝(0-based). active 이하를 "채움" 처리
  className?: string;
};

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 100);

const StepProgress = ({ total, active, className }: Props) => {
  // 접근성: 진행률(%) 계산
  const completed = Math.min(Math.max(active, 0), total - 1) + 1;
  const percent = Math.round((completed / total) * 100);

  return (
    <div
      className={clsx('mx-auto w-full', className)}
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

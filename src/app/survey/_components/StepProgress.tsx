/**
 * StepProgress
 * - 스텝 수(total)만큼 가로로 얇은 선(벡터)을 나열해 진행도를 표현
 * - 요구 사항:
 *   - 전체 ProgressBar 컨테이너는 좌우 패딩 20px(px-20) → padX=20
 *   - 바 사이 간격 gap=8px
 *   - 각 바 두께(border-width)=4px, 색상=#FF4F14(완료분), 미완료는 연灰색
 *   - angle=0deg/opacity=1은 단색 선으로 자연 충족
 *
 * 동작:
 * - active: 현재 스텝(0-based). "완료로 칠하는 구간"은 0..active 까지.
 * - total: 전체 스텝 수
 *
 * 스타일:
 * - 컨테이너 실제 유효폭(예: 375 - 20*2 = 335px)에서,
 *   각 바 너비 = (유효폭 - gap*(total-1)) / total
 *   → CSS Grid + gap으로 자동 충족
 */
'use client';

import clsx from 'clsx';

type Props = {
  total: number; // 전체 스텝 수
  active: number; // 현재 스텝(0-based). active 이하를 "채움" 처리
  className?: string;
};

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

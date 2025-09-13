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
  value: number; // 0~100
  className?: string; // 필요 시 외부 여백 등 커스터마이즈
  useGradient?: boolean; // 0deg 그라디언트 예시를 원하면 true
};

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 100);

const StepProgress = ({ value, className, useGradient = false }: Props) => {
  const pct = clamp01(value);

  return (
    <div
      className={clsx(
        // 중앙 정렬 + 고정 폭(335px). 화면이 더 좁으면 줄어들도록 안전장치.
        'mx-auto w-[335px] max-w-full',
        className
      )}
    >
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full transition-[width] duration-300 will-change-[width]"
          style={{
            width: `${pct}%`,
            // angle: 0deg → 아래 gradient는 단색과 동일. 단색만 쓰려면 bg = #FF4F14 로 충분.
            background: useGradient ? 'linear-gradient(0deg, #FF4F14 0%, #FF4F14 100%)' : '#FF4F14',
            opacity: 1,
          }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        />
      </div>
    </div>
  );
};

export default StepProgress;

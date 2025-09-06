import type { PropsWithChildren, ReactNode, CSSProperties } from 'react';

import clsx from 'clsx';

type Props = PropsWithChildren<{
  allowScroll?: boolean;
  backdrop?: ReactNode;
  showFrame?: boolean;
  frameClassName?: string; // ex) 'ring-1 ring-purple-500'
  showLabel?: boolean;
  debugOutline?: boolean;

  baseWidth?: number; // default 375
  baseHeight?: number; // default 668
  maxScalePx?: number; // default 1000 (높이 완전 매칭 위해 크게)
  minScalePx?: number; // default 0.5
}>;

const ScaledStage = ({
  allowScroll = true,
  backdrop,
  showFrame = true,
  frameClassName = 'ring-1 ring-purple-500',
  showLabel = true,
  debugOutline = false,
  baseWidth = 375,
  baseHeight = 668,
  maxScalePx = 1000, // ✅ 상한 크게: tall 화면에서도 height=100dvh 유지
  minScalePx = 0.5,
  children,
}: Props) => {
  const vars: CSSProperties = {
    ['--stage-base-w' as any]: baseWidth,
    ['--stage-base-h' as any]: baseHeight,
    ['--stage-max-scale' as any]: `${maxScalePx}px`,
    ['--stage-min-scale' as any]: `${minScalePx}px`,
  };

  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      {/* 375×668 밖 전체 배경 */}
      {backdrop && <div className="pointer-events-none absolute inset-0 -z-10">{backdrop}</div>}

      <div className="flex h-dvh w-full items-center justify-center">
        {/* 1em = 배율(px) 컨텍스트 */}
        <div className="stage-scale-context" style={vars}>
          {/* 고정 좌표계: 375×668 em (= height가 항상 100dvh) */}
          <div
            data-fixed-stage
            className={clsx(
              'relative h-[668em] w-[375em] bg-white shadow-xl',
              allowScroll ? 'overflow-auto' : 'overflow-hidden',
              showFrame && frameClassName, // ring/outline 프레임
              debugOutline && 'outline outline-1 outline-blue-300'
            )}
          >
            {children}

            {showLabel && (
              <span className="pointer-events-none absolute right-1 bottom-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                {baseWidth}×{baseHeight}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaledStage;

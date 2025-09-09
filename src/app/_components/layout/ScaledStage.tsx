import type { PropsWithChildren, ReactNode, CSSProperties } from 'react';

import clsx from 'clsx';

/**
 * 스테이지 컴포넌트 '두 가지 모드'로 분리
 *  - mode="preview": 지금처럼 375×668 고정 캔버스를 스케일 (디자인 QA/스토리북용)
 *  - mode="production": 실제 서비스용. max-w-[375px] w-full mx-auto로 가운데 정렬 + 일반 반응형(글자 크기는 rem, 레이아웃은 flex/grid).
 * */
type Mode = 'preview' | 'production';

interface Props extends PropsWithChildren {
  mode?: Mode;
  allowScroll?: boolean;
  backdrop?: ReactNode;
  showFrame?: boolean;
  frameClassName?: string;
  showLabel?: boolean;
  debugOutline?: boolean;

  baseWidth?: number; // default 375
  baseHeight?: number; // default 668
  maxScalePx?: number; // default 1000 (높이 완전 매칭 위해 크게)
  minScalePx?: number; // default 0.5
}

const ScaledStage = ({
  mode = 'production', // 'preview' | 'production'
  allowScroll = true,
  backdrop,
  showFrame = true,
  frameClassName = 'ring-1 ring-purple-500',
  showLabel = true,
  debugOutline = false,
  baseWidth = 375,
  baseHeight = 668,
  maxScalePx = 1000, // 상한 크게: tall 화면에서도 height=100dvh 유지
  minScalePx = 0.5,
  children,
}: Props) => {
  // ScaledStage (production 분기 보강안)
  if (mode === 'production') {
    return (
      <div className="min-h-screen-safe w-full">
        {backdrop && <div className="pointer-events-none fixed inset-0 -z-10">{backdrop}</div>}
        <div className={clsx('relative mx-auto w-full max-w-[375px]', showFrame && frameClassName)}>
          {/* 내부 overflow는 만들지 않음 = 문서/페이지 한 곳만 스크롤 */}
          {children}
          {showLabel && (
            <span className="pointer-events-none absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
              max-w 375
            </span>
          )}
        </div>
      </div>
    );
  }

  const vars: CSSProperties = {
    ['--stage-base-w' as any]: baseWidth,
    ['--stage-base-h' as any]: baseHeight,
    ['--stage-max-scale' as any]: `${maxScalePx}px`,
    ['--stage-min-scale' as any]: `${minScalePx}px`,
  };

  return (
    <div className="min-h-screen-safe relative w-full overflow-hidden">
      {backdrop && <div className="pointer-events-none absolute inset-0 -z-10">{backdrop}</div>}

      <div className="h-screen-safe flex w-full items-center justify-center">
        {/* 1em = 배율(px) 컨텍스트 */}
        <div className="stage-scale-context" style={vars}>
          <div
            data-fixed-stage
            className={clsx(
              'relative h-[668em] w-[375em] bg-white shadow-xl',
              allowScroll ? 'scroll-smooth-mobile overflow-auto' : 'overflow-hidden',
              showFrame && frameClassName,
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

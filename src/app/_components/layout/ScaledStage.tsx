import type { PropsWithChildren, ReactNode, CSSProperties } from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 스테이지 컴포넌트 '두 가지 모드'로 분리
 *  - mode="preview": 지금처럼 375×668 고정 캔버스를 스케일 (디자인 QA/스토리북용)
 *  - mode="production": 실제 서비스용. max-w-[375px] w-full mx-auto로 가운데 정렬  일반 반응형(글자 크기는 rem, 레이아웃은 flex/grid).
 * */
type Mode = 'preview' | 'production';

interface Props extends PropsWithChildren {
  /**
   * 스테이지 동작 모드
   * - preview: 개발/디자인 확인용
   * - production: 실제 배포 환경 렌더링
   * @default 'production'
   */
  mode?: Mode;

  /** 스크롤 허용 여부 (production 모드에서 data-fixed-stage 동작에 영향) */
  allowScroll?: boolean;

  /** 배경 요소 (ReactNode로 전달 가능) */
  backdrop?: ReactNode;

  /** 스테이지 외곽선 표시 여부 */
  showFrame?: boolean;
  /** 외곽선 className (Tailwind 적용 가능) */
  frameClassName?: string;

  /** 라벨 표시 여부 */
  showLabel?: boolean;

  /** 디버그용 outline 표시 여부 */
  debugOutline?: boolean;

  /** 기준 스테이지 너비(px) @default 375 */
  baseWidth?: number;

  /** 기준 스테이지 높이(px) @default 668 */
  baseHeight?: number;

  /** 최대 스케일 배율 (ex. 2 = 200%) @default 1000 (← 단위 정리 필요) */
  maxScalePx?: number;

  /** 최소 스케일 배율 (ex. 0.5 = 50%) @default 0.5 */
  minScalePx?: number;
}

type StageVars = CSSProperties & {
  '--stage-base-w'?: number | string;
  '--stage-base-h'?: number | string;
  '--stage-max-scale'?: string;
  '--stage-min-scale'?: string;
};

const ScaledStage = ({
  mode = 'production', // 'preview' | 'production'
  allowScroll = true,
  backdrop,
  showFrame = true,
  frameClassName = 'ring-1 ring-purple-500',
  showLabel = mode === 'preview',
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
            <span
              aria-hidden
              className="pointer-events-none absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white"
            >
              max-w 375
            </span>
          )}
        </div>
      </div>
    );
  }

  const vars: StageVars = {
    ['--stage-base-w']: baseWidth,
    ['--stage-base-h']: baseHeight,
    ['--stage-max-scale']: `${maxScalePx}px`,
    ['--stage-min-scale']: `${minScalePx}px`,
  };

  return (
    <div className="min-h-screen-safe relative w-full overflow-hidden">
      {backdrop && <div className="pointer-events-none absolute inset-0 -z-10">{backdrop}</div>}

      <div className="h-screen-safe flex w-full items-center justify-center">
        {/* 1em = 배율(px) 컨텍스트 */}
        <div className="stage-scale-context" style={vars}>
          <div
            data-fixed-stage
            className={twMerge(
              clsx(
                'relative h-[668em] w-[375em] bg-white shadow-xl',
                allowScroll ? 'scroll-smooth-mobile overflow-auto' : 'overflow-hidden',
                showFrame && frameClassName,
                debugOutline && 'outline outline-1 outline-blue-300'
              )
            )}
          >
            {children}

            {showLabel && (
              <span
                aria-hidden
                className="pointer-events-none absolute right-1 bottom-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white"
              >
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

import { cn } from '@/app/_lib/cn';

import type { ScaledStageProps, StageVars } from '@/app/_components/layout/type';

const Backdrop = ({ backdrop }: { backdrop?: React.ReactNode }) =>
  backdrop ? <div className="pointer-events-none fixed inset-0 -z-10">{backdrop}</div> : null;

const StageLabel = ({ text }: { text: string }) => (
  <span
    aria-hidden
    className="pointer-events-none absolute right-1 bottom-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white"
  >
    {text}
  </span>
);

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
}: ScaledStageProps) => {
  const vars: StageVars = {
    ['--stage-base-w']: baseWidth,
    ['--stage-base-h']: baseHeight,
    ['--stage-max-scale']: `${maxScalePx}px`,
    ['--stage-min-scale']: `${minScalePx}px`,
  };

  const productionStage = () => (
    <div className="min-h-screen-safe w-full">
      <Backdrop backdrop={backdrop} />
      <div
        className={cn(
          'min-h-screen-safe relative mx-auto flex w-full max-w-[475px] flex-col overflow-hidden bg-white',
          showFrame && frameClassName
        )}
      >
        <main className="flex flex-1">{children}</main>

        {showLabel && <StageLabel text="max-w 500" />}
      </div>
    </div>
  );

  const previewStage = () => (
    <div className="min-h-screen-safe relative w-full overflow-hidden">
      <Backdrop backdrop={backdrop} />
      <div className="h-screen-safe flex w-full items-center justify-center">
        <div className="stage-scale-context" style={vars}>
          <div
            data-fixed-stage
            className={cn(
              'relative h-full w-full bg-white shadow-xl',
              allowScroll ? 'scroll-smooth-mobile overflow-auto' : 'overflow-hidden',
              showFrame && frameClassName,
              debugOutline && 'outline outline-1 outline-blue-300'
            )}
          >
            {children}
            {showLabel && <StageLabel text={`${baseWidth}×${baseHeight}`} />}
          </div>
        </div>
      </div>
    </div>
  );

  return mode === 'production' ? productionStage() : previewStage();
};

export default ScaledStage;

'use client';

import { useLayoutEffect, useRef, useState, type PropsWithChildren, type ReactNode } from 'react';

import clsx from 'clsx';

type Props = PropsWithChildren<{
  /** 스테이지(357x668) 내부가 넘칠 때 내부 스크롤 허용 */
  allowScroll?: boolean;
  /** 스테이지 밖 화면을 꾸밀 배경/이미지 레이어(선택) */
  backdrop?: ReactNode;
  /** 디버그용 외곽선 표시 */
  debugOutline?: boolean;
}>;

const BASE_W = 357;
const BASE_H = 668;

/**
 * 화면(브라우저) 크기에 맞춰 357x668 스테이지를 비율 유지로 스케일.
 * - 가운데 정렬
 * - 밖 영역(backdrop) 위에 스테이지가 얹힘
 * - 내부 좌표계는 언제나 357x668(px)
 */
const ScaledStage = ({ allowScroll = true, backdrop, debugOutline = false, children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      // 컨테이너(= 화면) 실측
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      // 양축을 넘지 않게 하는 스케일값
      const next = Math.min(cw / BASE_W, ch / BASE_H);
      setScale(next);
    };

    // 첫 계산 + 리사이즈 대응
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('orientationchange', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  const stageBoxW = BASE_W * scale;
  const stageBoxH = BASE_H * scale;

  return (
    <div ref={containerRef} className="relative min-h-dvh w-full overflow-hidden">
      {/* 배경(스테이지 바깥 꾸미기) */}
      {backdrop && <div className="pointer-events-none absolute inset-0 -z-10">{backdrop}</div>}

      {/* 스케일된 스테이지 박스(중앙 정렬) */}
      <div
        style={{ width: stageBoxW, height: stageBoxH }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {/* 실제 스테이지(357x668, 좌표계 고정) */}
        <div
          data-fixed-stage
          className={clsx(
            'relative h-[668px] w-[357px] bg-white shadow-xl',
            allowScroll ? 'overflow-auto' : 'overflow-hidden',
            debugOutline && 'outline outline-1 outline-blue-300'
          )}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            willChange: 'transform',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScaledStage;

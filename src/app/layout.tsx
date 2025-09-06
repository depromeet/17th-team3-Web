import './globals.css';
import Image from 'next/image';

import ScaledStage from '@/app/_components/layout/ScaledStage';

import type { Viewport, Metadata } from 'next';

export const metadata: Metadata = {
  title: 'App',
  description: 'Height-fit 375×668 (CSS-only)',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <ScaledStage
          allowScroll
          showFrame
          frameClassName="ring-2 ring-purple-500"
          showLabel
          baseWidth={375}
          baseHeight={668}
          maxScalePx={1000} // 높이 완전 매칭
          minScalePx={0.5}
          backdrop={
            <Image
              src="/images/backgroundImage.png"
              alt="background"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          }
        >
          {children}
        </ScaledStage>
      </body>
    </html>
  );
};

export default RootLayout;

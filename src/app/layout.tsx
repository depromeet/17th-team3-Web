import './globals.css';
import ScaledStage from '@/app/_components/layout/ScaledStage';

import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'App',
  description: 'Fixed 375x668 viewport',
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
          debugOutline
          backdrop={
            /* 예시 배경: 그라디언트/이미지/패턴 등 자유롭게 */
            <div className="h-full w-full bg-gradient-to-br from-neutral-100 to-neutral-200" />
          }
        >
          {children}
        </ScaledStage>
      </body>
    </html>
  );
};

export default RootLayout;

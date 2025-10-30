import { MantineProvider } from '@mantine/core';
import Image from 'next/image';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import ScaledStage from '@/app/_components/layout/ScaledStage';
import { ToastProvider } from '@/app/_features/toast';
import ReactQueryProvider from '@/app/_providers/ReactQueryProvider';

import type { Viewport, Metadata } from 'next';

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.css';
import './globals.css';

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
          mode="production"
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
              alt=""
              aria-hidden
              role="presentation"
              fill
              sizes="100vw"
              className="object-cover"
            />
          }
        >
          <MantineProvider>
            <ReactQueryProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
            </ReactQueryProvider>
          </MantineProvider>
        </ScaledStage>
        <ToastProvider />
      </body>
    </html>
  );
};

export default RootLayout;

'use client';

import { useEffect } from 'react';

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    // TODO: sentry/console 로깅
    // console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body className="p-6 grid min-h-dvh place-items-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">문제가 발생했어요</h1>
          <p className="mt-2 text-sm text-neutral-600">{error?.message}</p>
          <button onClick={() => reset()} className="mt-4 rounded px-4 py-2 border">
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;

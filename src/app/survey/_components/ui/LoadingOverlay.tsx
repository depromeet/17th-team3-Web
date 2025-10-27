'use client';

import Image from 'next/image';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
      <Image
        src="/images/momuzzi-survey-loading.svg"
        alt="설문 저장 중"
        width={120}
        height={200}
        priority
      />
    </div>
  );
};

export default LoadingOverlay;

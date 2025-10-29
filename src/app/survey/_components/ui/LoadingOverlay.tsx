'use client';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60">
      <img
        src="/images/momuzzi-survey-loading.gif"
        alt="설문 저장 중"
        className="h-auto w-[270px]"
      />
    </div>
  );
};

export default LoadingOverlay;

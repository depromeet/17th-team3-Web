'use client';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import NameStep from '@/app/meetings/create/_components/step/NameStep';

const CreatePage = () => {
  const handleCancel = () => {};
  const handleNext = () => {};

  return (
    <div className="flex h-[100dvh] flex-col bg-[url('/images/mobileBackground.svg')] bg-cover">
      <TopNavigation title="모임 만들기" showBackButton />
      {/* todo: StepIndicator 컴포넌트로 추가 */}
      <NameStep onNext={handleNext} onCancel={handleCancel} />
    </div>
  );
};

export default CreatePage;

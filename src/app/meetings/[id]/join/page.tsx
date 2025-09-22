'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import StepIndicator from '@/app/_components/ui/StepIndicator';
import NickNameStep from '@/app/meetings/[id]/join/step/NicknameStep';

const JoinMeetingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();

  const handleCancel = () => {
    if (currentStep === 1) {
      // todo: 모달 출력
      router.push('/');
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  const handleNext = (_value: string) => {
    /** todo
     * 설문 퍼널 '다음 단계로' 버튼 클릭 이벤트 핸들러는 따로 관리해도 됨
     * 설문 퍼널과 어떻게 연결할지에 따라 달라질 것 같음
     */
    setCurrentStep((prev) => prev + 1);
  };

  // todo: 설문 퍼널을 currentStep으로 공통 관리 또는 개별 관리 중 선택
  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return <NickNameStep onNext={handleNext} onCancel={handleCancel} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[100dvh] flex-col background-1">
      <TopNavigation showBackButton onLeftClick={handleCancel} />
      <div className="flex items-center justify-center px-5 py-1.5">
        {/* todo: total */}
        <StepIndicator value={currentStep} total={10} />
      </div>
      {renderStepForm()}
    </div>
  );
};

export default JoinMeetingPage;

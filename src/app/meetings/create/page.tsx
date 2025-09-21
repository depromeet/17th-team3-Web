'use client';

import { useState } from 'react';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import { MEETING_SIZE } from '@/app/_constants/meeting';
import DateTimeStep from '@/app/meetings/create/_components/step/DateTimeStep';
import MembersStep from '@/app/meetings/create/_components/step/MembersStep';
import NameStep from '@/app/meetings/create/_components/step/NameStep';

const CreatePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    members: MEETING_SIZE.MIN,
    date: '',
    time: '',
  });

  const handleCancel = () => {
    if (currentStep === 1) {
      // todo: 모달 출력
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  const handleNameNext = (name: string) => {
    setFormData((prev) => ({ ...prev, name }));
    setCurrentStep(2);
  };

  // const handleMembersNext = (members: number) => {
  //   setFormData((prev) => ({ ...prev, members }));
  //   setCurrentStep(3);
  // };

  // const handleDateTimeNext = (date: string, time: string) => {
  //   setFormData((prev) => ({ ...prev, date, time }));
  //   // 모임 생성 완료 로직
  //   console.log('모임 생성:', formData);
  // };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <NameStep onNext={handleNameNext} onCancel={handleCancel} initialValue={formData.name} />
        );
      case 2:
        return <MembersStep onNext={handleNameNext} onCancel={handleCancel} />;
      case 3:
        return <DateTimeStep onNext={handleNameNext} onCancel={handleCancel} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-[url('/images/mobileBackground.svg')] bg-cover">
      <TopNavigation title="모임 만들기" showBackButton />
      {/* todo: StepIndicator 컴포넌트로 추가 */}
      {renderStep()}
    </div>
  );
};

export default CreatePage;

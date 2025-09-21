'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import StepIndicator from '@/app/_components/ui/StepIndicator';
import { MEETING_SIZE } from '@/app/_constants/meeting';
import DateTimeStep from '@/app/meetings/create/_components/step/DateTimeStep';
import LocationStep from '@/app/meetings/create/_components/step/LocationStep';
import MembersStep from '@/app/meetings/create/_components/step/MembersStep';
import NameStep from '@/app/meetings/create/_components/step/NameStep';

const CreatePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    members: MEETING_SIZE.MIN,
    location: '',
    date: '',
    time: '',
  });

  const router = useRouter();

  const handleCancel = () => {
    if (currentStep === 1) {
      // todo: 모달 출력
      router.push('/');
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  // todo: 아래 함수 공통화 고민 필요
  const handleNameNext = (name: string) => {
    setFormData((prev) => ({ ...prev, name }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleMembersNext = (members: number) => {
    setFormData((prev) => ({ ...prev, members }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleLocationNext = (location: string) => {
    setFormData((prev) => ({ ...prev, location }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleDateTimeNext = (date: string, time: string) => {
    setFormData((prev) => ({ ...prev, date, time }));
    console.log('모임 생성:', formData); // 모임 생성 완료 로직
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <NameStep onNext={handleNameNext} onCancel={handleCancel} initialValue={formData.name} />
        );
      case 2:
        return (
          <MembersStep
            onNext={handleMembersNext}
            onCancel={handleCancel}
            initialValue={formData.members}
          />
        );
      case 3:
        return (
          <LocationStep
            onNext={handleLocationNext}
            onCancel={handleCancel}
            initialValue={formData.location}
          />
        );
      case 4:
        return (
          <DateTimeStep
            onNext={handleDateTimeNext}
            onCancel={handleCancel}
            initialValue={{ date: formData.date, time: formData.time }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[100dvh] flex-col background-1">
      <TopNavigation title="모임 만들기" showBackButton onLeftClick={handleCancel} />
      <div className="flex items-center justify-center px-4 py-1.5">
        <StepIndicator value={currentStep} total={4} />
      </div>
      {renderStep()}
    </div>
  );
};

export default CreatePage;

'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import StepIndicator from '@/app/_components/ui/StepIndicator';
import DateTimeStep from '@/app/meetings/create/_components/step/DateTimeStep';
import LocationStep from '@/app/meetings/create/_components/step/LocationStep';
import MembersStep from '@/app/meetings/create/_components/step/MembersStep';
import NameStep from '@/app/meetings/create/_components/step/NameStep';
import { TOTAL_STEPS, MEMBERS_SIZE } from '@/app/meetings/create/_models/constants';
import { FormData } from '@/app/meetings/create/_models/types';

const CreatePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    members: MEMBERS_SIZE.MIN,
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

  const handleDateTimeNext = (date: string, time: string) => {
    setFormData((prev) => ({ ...prev, date, time }));
    console.log('모임 생성:', formData); // 모임 생성 완료 로직
  };

  function handleNext<K extends keyof FormData>(field: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setCurrentStep((prev) => prev + 1);
  }

  const { name, members, location, date, time } = formData;

  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <NameStep
            onNext={() => handleNext('name', formData.name)}
            onCancel={handleCancel}
            initialValue={name}
          />
        );
      case 2:
        return (
          <MembersStep
            onNext={() => handleNext('members', formData.members)}
            onCancel={handleCancel}
            initialValue={members}
          />
        );
      case 3:
        return (
          <LocationStep
            onNext={() => handleNext('location', formData.location)}
            onCancel={handleCancel}
            initialValue={location}
          />
        );
      case 4:
        return (
          <DateTimeStep
            onNext={handleDateTimeNext}
            onCancel={handleCancel}
            initialValue={{ date, time }}
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
        <StepIndicator value={currentStep} total={TOTAL_STEPS} />
      </div>
      {renderStepForm()}
    </div>
  );
};

export default CreatePage;

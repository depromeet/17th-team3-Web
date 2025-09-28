'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import ConfirmModal from '@/app/_components/ui/Modal/ConfirmModal';
import StepIndicator from '@/app/_components/ui/StepIndicator';
import DateTimeStep from '@/app/meetings/create/_components/step/DateTimeStep';
import LocationStep from '@/app/meetings/create/_components/step/LocationStep';
import MembersStep from '@/app/meetings/create/_components/step/MembersStep';
import NameStep from '@/app/meetings/create/_components/step/NameStep';
import { TOTAL_STEPS, MEMBERS_SIZE } from '@/app/meetings/create/_models/constants';
import { CreateMeetingForm } from '@/app/meetings/create/_models/types';

const CreatePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    members: MEMBERS_SIZE.MIN,
    location: '',
    date: '',
    time: '',
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();

  const handleCancel = () => {
    if (currentStep === 1) {
      setShowConfirm(true);
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  const handleDateTimeNext = (date: string, time: string) => {
    setFormData((prev) => ({ ...prev, date, time }));
    // data, time 업데이트 검토 필요
    // todo: API 요청
    console.log('모임 생성:', formData);
    router.push('/meetings/create/success/');
  };

  function handleNext<K extends keyof CreateMeetingForm>(field: K, value: CreateMeetingForm[K]) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setCurrentStep((prev) => prev + 1);
  }

  const renderStepForm = () => {
    switch (currentStep) {
      case 4:
        return (
          <NameStep onNext={(value: string) => handleNext('name', value)} onCancel={handleCancel} />
        );
      case 2:
        return (
          <MembersStep
            onNext={(value: number) => handleNext('members', value)}
            onCancel={handleCancel}
          />
        );
      case 3:
        return (
          <LocationStep
            onNext={(value: string) => handleNext('location', value)}
            onCancel={handleCancel}
          />
        );
      case 1:
        return <DateTimeStep onNext={handleDateTimeNext} onCancel={handleCancel} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex h-[100dvh] flex-col background-1">
      <TopNavigation title="모임 만들기" showBackButton onLeftClick={handleCancel} />
      <div className="flex items-center justify-center px-5 py-1.5">
        <StepIndicator value={currentStep} total={TOTAL_STEPS} />
      </div>
      {renderStepForm()}

      <ConfirmModal
        isOpen={showConfirm}
        title="모임 만들기를 취소하시겠어요?"
        onConfirm={() => router.push('/')}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default CreatePage;

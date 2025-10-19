'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import { Heading, TitleGroup } from '@/app/_components/typography';
import Badge from '@/app/_components/ui/Badge';
import ConfirmModal from '@/app/_components/ui/Modal/ConfirmModal';
import StepIndicator from '@/app/_components/ui/StepIndicator';
import StepperInput from '@/app/_components/ui/StepperInput';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';
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

  // const handleDateTimeNext = (date: string, time: string) => {
  //   setFormData((prev) => ({ ...prev, date, time }));
  //   // data, time 업데이트 검토 필요
  //   // todo: API 요청
  //   console.log('모임 생성:', formData);
  //   router.push('/meetings/create/success/');
  // };

  // function handleNext<K extends keyof CreateMeetingForm>(field: K, value: CreateMeetingForm[K]) {
  //   setFormData((prev) => ({ ...prev, [field]: value }));
  //   setCurrentStep((prev) => prev + 1);
  // }

  // const renderStepForm = () => {
  //   switch (currentStep) {
  //     case 1:
  //       return (
  //         <NameStep onNext={(value: string) => handleNext('name', value)} onCancel={handleCancel} />
  //       );
  //     case 2:
  //       return (
  //         <MembersStep
  //           onNext={(value: number) => handleNext('members', value)}
  //           onCancel={handleCancel}
  //         />
  //       );
  //     case 3:
  //       return (
  //         <LocationStep
  //           onNext={(value: string) => handleNext('location', value)}
  //           onCancel={handleCancel}
  //         />
  //       );
  //     case 4:
  //       return <DateTimeStep onNext={handleDateTimeNext} onCancel={handleCancel} />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="relative flex h-[100dvh] flex-col background-1">
      <TopNavigation showBackButton onLeftClick={handleCancel} />
      {/* {renderStepForm()} */}
      <header className="flex flex-1 flex-col px-4 pt-1 pb-8">
        <Badge>모임 만들기</Badge>
        <Heading as="h1">{`모임 이름과 내용을\n작성해 주세요`}</Heading>
      </header>

      <main className="flex flex-1 flex-col px-5"></main>

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

'use client';

import { useState } from 'react';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import { TitleGroup } from '@/app/_components/typography';
import Button from '@/app/_components/ui/Button';
import Input from '@/app/_components/ui/Input';

const CreatePage = () => {
  const [name, setName] = useState('');

  const handleCancel = () => {};
  const handleNext = () => {};

  return (
    <div className="flex h-[100dvh] flex-col bg-[url('/images/mobileBackground.svg')] bg-cover">
      <TopNavigation title="모임 만들기" showBackButton />
      {/* todo: StepIndicator 컴포넌트로 추가 */}
      <FormStep
        title="모임 이름은 무엇인가요?"
        description="닉네임은 언제든지 변경할 수 있어요."
        onNext={handleNext}
        onCancel={handleCancel}
        isNextDisabled={!name} // todo: isNextDisabled 유효성 검증에 따른 disable 추가
        prevButtonText="취소"
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onClear={() => setName('')}
          placeholder="디프만 3팀"
          showClearButton
        />
      </FormStep>
    </div>
  );
};

interface FormStepProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onNext: () => void;
  onCancel: () => void;
  isNextDisabled?: boolean;
  prevButtonText?: string;
  nextButtonText?: string;
}

const FormStep = ({
  title,
  description,
  children,
  onNext,
  onCancel,
  isNextDisabled,
  prevButtonText = '이전',
  nextButtonText = '다음 단계로',
}: FormStepProps) => {
  return (
    <main className="flex flex-1 flex-col">
      <div className="px-4 pt-4 pb-8">
        <TitleGroup title={title} description={description} />
      </div>

      <div className="flex-1 px-4">{children}</div>

      <div className="flex gap-3 px-5 pt-3 pb-6">
        <Button theme="gray" onClick={onCancel} className="w-[114px]">
          {prevButtonText}
        </Button>
        <Button status={isNextDisabled ? 'disabled' : 'normal'} onClick={onNext} className="flex-1">
          {nextButtonText}
        </Button>
      </div>
    </main>
  );
};

export default CreatePage;

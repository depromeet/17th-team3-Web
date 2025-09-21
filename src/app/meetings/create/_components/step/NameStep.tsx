'use client';

import { useState } from 'react';

import Input from '@/app/_components/ui/Input';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';

interface NameStepProps {
  onNext: (name: string) => void;
  onCancel: () => void;
  initialValue: string;
}

const NameStep = ({ onNext, onCancel, initialValue = '' }: NameStepProps) => {
  const [name, setName] = useState(initialValue);

  const handleNext = () => {
    onNext(name);
  };

  return (
    <StepFormLayout
      title="모임 이름은 무엇인가요?"
      onNext={handleNext}
      onCancel={onCancel}
      isNextDisabled={!name} // todo: isNextDisabled 유효성 검증에 따른 disable 추가
      prevButtonText="취소"
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onClear={() => setName('')}
        showClearButton
      />
    </StepFormLayout>
  );
};

export default NameStep;

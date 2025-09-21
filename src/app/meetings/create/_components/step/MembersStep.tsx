'use client';

import { useState } from 'react';

import Input from '@/app/_components/ui/Input';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';

interface MembersStepProps {
  onNext: (name: string) => void;
  onCancel: () => void;
  initialValue?: string;
}

const MembersStep = ({ onNext, onCancel, initialValue = '' }: MembersStepProps) => {
  const [name, setName] = useState(initialValue);

  const handleNext = () => {
    onNext(name);
  };

  return (
    <StepFormLayout
      title="모임 이름은 무엇인가요?"
      description="닉네임은 언제든지 변경할 수 있어요."
      onNext={handleNext}
      onCancel={onCancel}
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
    </StepFormLayout>
  );
};

export default MembersStep;

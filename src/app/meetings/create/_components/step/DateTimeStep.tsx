'use client';

import { useState } from 'react';

import Input from '@/app/_components/ui/Input';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';

interface DateTimeStepProps {
  onNext: (date: string, time: string) => void;
  onCancel: () => void;
  initialValue: { date: string; time: string };
}

const DateTimeStep = ({ onNext, onCancel, initialValue }: DateTimeStepProps) => {
  const [date, setDate] = useState(initialValue.date);
  const [time, setTime] = useState(initialValue.time);

  const handleNext = () => {
    onNext(date, time);
  };

  return (
    <StepFormLayout
      title="언제 만나시나요?"
      onNext={handleNext}
      onCancel={onCancel}
      // isNextDisabled={!name} // todo: isNextDisabled 유효성 검증에 따른 disable 추가
      nextButtonText="생성하기"
    >
      <Input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="디프만 3팀"
        showClearButton
      />
    </StepFormLayout>
  );
};

export default DateTimeStep;

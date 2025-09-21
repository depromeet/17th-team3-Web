'use client';

import { useEffect, useState } from 'react';

import Input from '@/app/_components/ui/Input';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';
import { validateText } from '@/app/meetings/_utils/validate';

interface NameStepProps {
  onNext: (name: string) => void;
  onCancel: () => void;
  initialValue: string;
}

const NameStep = ({ onNext, onCancel, initialValue = '' }: NameStepProps) => {
  const [name, setName] = useState(initialValue);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setIsError(true);
      setErrorMessage('모임 이름을 입력해주세요.');
      return;
    }

    const result = validateText(trimmedName);
    if (!result.isValid) {
      setIsError(true);
      setErrorMessage(result.error);
      return;
    }

    onNext(trimmedName);
  };

  useEffect(() => {
    const result = validateText(name);
    setIsError(!result.isValid);
    setErrorMessage(result.error);
  }, [name]);

  return (
    <StepFormLayout
      title="모임 이름은 무엇인가요?"
      onNext={handleNext}
      onCancel={onCancel}
      isNextDisabled={!name || isError}
      prevButtonText="취소"
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onClear={() => setName('')}
        hasError={isError}
        errorMessage={errorMessage}
        showClearButton
        maxLength={222}
      />
    </StepFormLayout>
  );
};

export default NameStep;

'use client';

import { useState } from 'react';

import Input from '@/app/_components/ui/Input';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';

interface LocationStepProps {
  onNext: (location: string) => void;
  onCancel: () => void;
  initialValue: string;
}

const LocationStep = ({ onNext, onCancel, initialValue = '' }: LocationStepProps) => {
  const [location, setLocation] = useState(initialValue);

  const handleNext = () => {
    onNext(location);
  };

  return (
    <StepFormLayout
      title={`모임을 진행할 장소를\n설정해주세요`}
      onNext={handleNext}
      onCancel={onCancel}
      isNextDisabled={!location} // todo: isNextDisabled 유효성 검증에 따른 disable 추가
    >
      <Input
        type="search"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onClear={() => setLocation('')}
        placeholder="강남역"
        showClearButton
      />
    </StepFormLayout>
  );
};

export default LocationStep;

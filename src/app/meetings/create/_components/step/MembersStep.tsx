'use client';

import { useState } from 'react';

import StepperInput from '@/app/_components/ui/StepperInput';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';
import { MEMBERS_SIZE } from '@/app/meetings/create/_models/constants';

interface MembersStepProps {
  onNext: (members: number) => void;
  onCancel: () => void;
}

const MembersStep = ({ onNext, onCancel }: MembersStepProps) => {
  const [members, setMembers] = useState(MEMBERS_SIZE.MIN);

  const handleNext = () => {
    onNext(members);
  };

  return (
    <StepFormLayout title="모임 인원은 몇 명인가요?" onNext={handleNext} onCancel={onCancel}>
      <StepperInput value={members} onChange={(members) => setMembers(members)} />
    </StepFormLayout>
  );
};

export default MembersStep;

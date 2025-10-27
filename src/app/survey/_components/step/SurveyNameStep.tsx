'use client';

import { useEffect, useState } from 'react';

import Input from '@/app/_components/ui/Input';
import { validateText } from '@/app/meetings/_utils/validation';
import ProfileSelector from '@/app/survey/_components/ui/ProfileSelector';
import StepFormLayout from '@/app/survey/_components/ui/StepFormLayout';

interface SurveyNameStepProps {
  onNext: (payload: { name: string; profileKey: string }) => void;
  onCancel: () => void;
  initialValue?: string;
  initialProfileKey?: string;
  title?: string;
  description?: string;
}

const SurveyNameStep = ({
  onNext,
  onCancel,
  initialValue = '',
  initialProfileKey = 'default',
  title = '사용하실 프로필과\n이름을 알려주세요',
  description = '',
}: SurveyNameStepProps) => {
  const [name, setName] = useState(initialValue);
  const [profileKey, setProfileKey] = useState(initialProfileKey);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    const trimmed = name.trim();
    const result = validateText(trimmed);
    if (!result.isValid) {
      setIsError(true);
      setErrorMessage(result.error);
      return;
    }

    // 선택한 프로필 키까지 함께 전달
    onNext({ name: trimmed, profileKey });
  };

  useEffect(() => {
    const result = validateText(name);
    setIsError(!result.isValid);
    setErrorMessage(result.error);
  }, [name]);

  useEffect(() => {
    setProfileKey(initialProfileKey);
  }, [initialProfileKey]);

  return (
    <StepFormLayout
      title={title}
      description={description}
      onNext={handleNext}
      onCancel={onCancel}
      isNextDisabled={!name || isError}
      prevButtonText="이전"
      nextButtonText="다음 단계로"
    >
      <ProfileSelector value={profileKey} onChange={(selected) => setProfileKey(selected)} />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onClear={() => setName('')}
        hasError={isError}
        errorMessage={errorMessage}
        showClearButton
        maxLength={21}
        placeholder="이름 입력"
      />
    </StepFormLayout>
  );
};

export default SurveyNameStep;

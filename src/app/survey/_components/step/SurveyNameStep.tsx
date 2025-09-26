/** src/app/survey/_components/steps/SurveyNameStep.tsx */
'use client';

import { useEffect, useState } from 'react';

import Input from '@/app/_components/ui/Input';
import { validateText } from '@/app/meetings/_utils/validation';
import StepFormLayout from '@/app/survey/_components/ui/StepFormLayout';
// meetings 유틸 재사용 (공유가 어렵다면 아래 fallback 사용)

interface SurveyNameStepProps {
  onNext: (name: string) => void;
  onCancel: () => void;
  initialValue?: string;
  // (선택) 상단 문구를 미세하게 바꾸고 싶다면 props로 조절 가능
  title?: string;
  description?: string;
}

const SurveyNameStep = ({
  onNext,
  onCancel,
  initialValue = '',
  title = '당신의 이름을 알려주세요',
  description = '닉네임은 언제든지 변경할 수 있어요.',
}: SurveyNameStepProps) => {
  const [name, setName] = useState(initialValue);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    const trimmed = name.trim();

    if (!trimmed) {
      setIsError(true);
      setErrorMessage('이름을 입력해주세요.');
      return;
    }

    const result = validateText(trimmed); // meetings 유틸 재사용
    if (!result.isValid) {
      setIsError(true);
      setErrorMessage(result.error);
      return;
    }

    onNext(trimmed);
  };

  useEffect(() => {
    const result = validateText(name);
    setIsError(!result.isValid);
    setErrorMessage(result.error);
  }, [name]);

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

/* ------------- Fallback validator (meetings 유틸 공유가 어려운 경우) -------------
type ValidationResult = { isValid: boolean; error?: string };
const fallbackValidateText = (text: string): ValidationResult => {
  if (!text.trim()) return { isValid: false, error: '이름을 입력해주세요.' };
  if (text.length > 21) return { isValid: false, error: '최대 21자까지 입력할 수 있어요.' };
  return { isValid: true };
};
// 위에서 import { validateText } ... 대신:
// const validateText = fallbackValidateText;
----------------------------------------------------------------------------- */

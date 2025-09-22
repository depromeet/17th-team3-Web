'use client';

import { useEffect, useState } from 'react';

import Input from '@/app/_components/ui/Input';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';
import { validateText } from '@/app/meetings/_utils/validation';

interface NicknameStepProps {
  onNext: (nickname: string) => void;
  onCancel: () => void;
}

const NicknameStep = ({ onNext, onCancel }: NicknameStepProps) => {
  const [nickname, setNickname] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    const trimmedNickname = nickname.trim();

    if (!trimmedNickname) {
      setIsError(true);
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }

    const result = validateText(trimmedNickname);
    if (!result.isValid) {
      setIsError(true);
      setErrorMessage(result.error);
      return;
    }

    onNext(trimmedNickname);
  };

  useEffect(() => {
    const result = validateText(nickname);
    setIsError(!result.isValid);
    setErrorMessage(result.error);
  }, [nickname]);

  return (
    <StepFormLayout
      title="당신의 이름을 알려주세요"
      description="닉네임은 언제든지 변경할 수 있어요."
      onNext={handleNext}
      onCancel={onCancel}
      isNextDisabled={!nickname || isError}
      prevButtonText="취소"
    >
      <Input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        onClear={() => setNickname('')}
        hasError={isError}
        errorMessage={errorMessage}
        showClearButton
        maxLength={21}
        placeholder="옆집피자스리슬쩍"
      />
    </StepFormLayout>
  );
};

export default NicknameStep;

'use client';

import { useEffect, useState } from 'react';

import Input from '@/app/_components/ui/Input';
import Loading from '@/app/_components/ui/Loading';
import { surveyApi } from '@/app/_services/survey/api';
import { validateText } from '@/app/meetings/_utils/validation';
import StepFormLayout from '@/app/survey/_components/ui/form/StepFormLayout';
import ProfileSelector from '@/app/survey/_components/ui/selector/ProfileSelector';

interface SurveyProfileStepProps {
  onNext: (payload: { name: string; profileKey: string }) => void;
  onCancel: () => void;
  initialValue?: string;
  initialProfileKey?: string;
  title?: string;
  description?: string;
  meetingId?: number;
}

const SurveyProfileStep = ({
  onNext,
  onCancel,
  initialValue = '',
  initialProfileKey = 'default',
  title = '사용하실 프로필과\n이름을 알려주세요',
  description = '',
  meetingId = 0, // TODO: 실제 모임 ID 전달받기
}: SurveyProfileStepProps) => {
  const [name, setName] = useState(initialValue);
  const [profileKey, setProfileKey] = useState(initialProfileKey);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** 이름 및 색상 검증 */
  useEffect(() => {
    const result = validateText(name);
    setIsError(!result.isValid);
    setErrorMessage(result.error);
  }, [name]);

  useEffect(() => {
    setProfileKey(initialProfileKey);
  }, [initialProfileKey]);

  /** 프로필 저장 및 다음 단계 이동 */
  const handleNext = async () => {
    const trimmed = name.trim();
    const result = validateText(trimmed);
    if (!result.isValid) {
      setIsError(true);
      setErrorMessage(result.error);
      return;
    }

    try {
      setIsSubmitting(true);

      await surveyApi.putAttendeeProfile(meetingId, {
        attendeeNickname: trimmed,
        color: profileKey.toUpperCase(), // 예: 'ORANGE'
      });

      // 성공 시 다음 단계 이동
      onNext({ name: trimmed, profileKey });
    } catch (error: unknown) {
      const err = error as Error;
      console.error('프로필 저장 실패:', err.message);
      alert('프로필 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <StepFormLayout
        title={title}
        description={description}
        onNext={handleNext}
        onCancel={onCancel}
        isNextDisabled={!name || isError || isSubmitting}
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

      {isSubmitting && <Loading />}
    </>
  );
};

export default SurveyProfileStep;

'use client';

import { useEffect, useState } from 'react';

import Input from '@/app/_components/ui/Input';
import Loading from '@/app/_components/ui/Loading';
import { surveyApi } from '@/app/_services/survey/api';
import StepFormLayout from '@/app/survey/_components/ui/form/StepFormLayout';
import ProfileSelector from '@/app/survey/_components/ui/selector/ProfileSelector';
import { useProfileValidation } from '@/app/survey/_hooks/useProfileValidation';

interface SurveyProfileStepProps {
  onNext: (payload: { name: string; profileKey: string }) => void;
  onCancel: () => void;
  initialValue?: string;
  initialProfileKey?: string;
  title?: string;
  description?: string;
  meetingId: number;
}

/** SurveyProfileStep
 * - 이름 / 프로필 색상 선택 단계
 * - 닉네임 및 프로필 중복 검증
 * - 검증 통과 시 프로필 저장 후 다음 단계 이동
 */
const SurveyProfileStep = ({
  onNext,
  onCancel,
  initialValue = '',
  initialProfileKey = 'default',
  title = '사용하실 프로필과\n이름을 알려주세요',
  description = '다음 단계로 넘어가면 수정할 수 없어요.',
  meetingId, // TODO: 실제 모임 ID 전달받기
}: SurveyProfileStepProps) => {
  const [name, setName] = useState(initialValue);
  const [profileKey, setProfileKey] = useState(initialProfileKey);
  const [usedNicknames, setUsedNicknames] = useState<string[]>([]);
  const [lockedProfileKeys, setLockedProfileKeys] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { error, setError, validateNickname, validateColor, handleApiError } = useProfileValidation(
    {
      usedNicknames,
      lockedProfileKeys,
    }
  );

  /** 모임 참가자 데이터 로드 (닉네임/색상 중복검사용) */
  useEffect(() => {
    if (!meetingId) return;
    (async () => {
      try {
        const res = await surveyApi.getMeetingDetail(meetingId);
        const others = res.participantList.filter((p) => p.userId !== res.currentUserId);
        setUsedNicknames(others.map((p) => p.nickname));
        setLockedProfileKeys(others.map((p) => p.profileColor.toLowerCase()));
      } catch (err) {
        console.error('모임 상세 조회(getMeetingDetail) 실패:', err);
      }
    })();
  }, [meetingId]);

  /** 프로필 저장 + 다음 단계 이동 */
  const handleNext = async () => {
    const nicknameError = validateNickname(name);
    if (nicknameError) return setError(nicknameError);

    const colorError = validateColor(profileKey);
    if (colorError) return setError(colorError);

    try {
      setIsSubmitting(true);
      await surveyApi.putAttendeeProfile(meetingId, {
        attendeeNickname: name.trim(),
        color: profileKey.toUpperCase(),
      });
      onNext({ name, profileKey });
    } catch (e) {
      handleApiError(e);
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
        isNextDisabled={!name.trim() || !!error || isSubmitting}
        nextButtonText="다음 단계로"
      >
        <ProfileSelector
          value={profileKey}
          onChange={setProfileKey}
          lockedKeys={lockedProfileKeys}
        />
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(validateNickname(e.target.value));
          }}
          onClear={() => setName('')}
          hasError={!!error}
          errorMessage={error}
          placeholder="이름 입력"
        />
      </StepFormLayout>
      {isSubmitting && <Loading />}
    </>
  );
};

export default SurveyProfileStep;

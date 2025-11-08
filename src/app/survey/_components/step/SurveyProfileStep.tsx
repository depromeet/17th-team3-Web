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
  description = '',
  meetingId = 0, // TODO: 실제 모임 ID 전달받기
}: SurveyProfileStepProps) => {
  const [name, setName] = useState(initialValue);
  const [profileKey, setProfileKey] = useState(initialProfileKey);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [lockedProfileKeys, setLockedProfileKeys] = useState<string[]>([]);
  const [usedNicknames, setUsedNicknames] = useState<string[]>([]);

  /** 모임 참가자 목록 조회 → 닉네임 / 프로필 색상 중복 확인용 데이터 저장 */
  useEffect(() => {
    if (!meetingId) return;

    const fetchMeetingDetail = async () => {
      try {
        const res = await surveyApi.getMeetingDetail(meetingId);

        console.warn('meetingDetail:', res); // { currentUserId: 3, meetingInfo: {...}, participantList: [...] }

        const { currentUserId, participantList = [] } = res;
        const participants = participantList;

        // 본인 제외
        const others = participants.filter((p) => p.userId !== currentUserId);

        setLockedProfileKeys(others.map((p) => p.profileColor.toLowerCase()));
        setUsedNicknames(others.map((p) => p.nickname));
      } catch (err) {
        console.error('모임 상세 조회 실패:', err);
      }
    };

    fetchMeetingDetail();
  }, [meetingId]);

  /** 닉네임 검증 (본인 예외 반영) */
  useEffect(() => {
    const trimmed = name.trim();
    const result = validateText(trimmed);

    // 기본 텍스트 형식 검증
    if (!result.isValid) {
      setIsError(true);
      setErrorMessage(result.error);
      return;
    }

    // 이미 존재하는 닉네임(본인 제외) 검사
    if (usedNicknames.includes(trimmed)) {
      setIsError(true);
      setErrorMessage('이미 사용 중인 닉네임입니다.');
      return;
    }

    setIsError(false);
    setErrorMessage('');
  }, [name, usedNicknames]);

  /** 프로필 저장 및 다음 단계 이동 */
  useEffect(() => {
    setProfileKey(initialProfileKey);
  }, [initialProfileKey]);

  /** 프로필 저장 및 다음 단계 이동 */
  const handleNext = async () => {
    const trimmed = name.trim();
    if (isError || !trimmed) return;

    // 캐릭터 중복 (본인 제외)
    if (lockedProfileKeys.includes(profileKey.toLowerCase())) {
      alert('이미 사용 중인 프로필 색상입니다.');
      return;
    }

    try {
      setIsSubmitting(true);

      await surveyApi.putAttendeeProfile(meetingId, {
        attendeeNickname: trimmed,
        color: profileKey.toUpperCase(),
      });

      onNext({ name: trimmed, profileKey });
    } catch (error: unknown) {
      console.error('프로필 저장 실패:', (error as Error).message);
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
        <ProfileSelector
          value={profileKey}
          onChange={(selected) => setProfileKey(selected)}
          lockedKeys={lockedProfileKeys}
        />

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

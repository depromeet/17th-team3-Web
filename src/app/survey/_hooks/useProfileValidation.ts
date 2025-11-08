import { useState, useCallback } from 'react';

import { validateText } from '@/app/meetings/_utils/validation';

interface ProfileValidationOptions {
  usedNicknames: string[];
  lockedProfileKeys: string[];
}

export const useProfileValidation = ({
  usedNicknames,
  lockedProfileKeys,
}: ProfileValidationOptions) => {
  const [error, setError] = useState<string>('');

  const validateNickname = useCallback(
    (value: string) => {
      const { isValid, error: textError } = validateText(value.trim());
      if (!isValid) return textError;
      if (usedNicknames.includes(value.trim())) return '이미 사용 중인 닉네임입니다.';
      return '';
    },
    [usedNicknames]
  );

  const validateColor = useCallback(
    (key: string) => {
      if (lockedProfileKeys.includes(key.toLowerCase())) return '이미 사용 중인 프로필 색상입니다.';
      return '';
    },
    [lockedProfileKeys]
  );

  const handleApiError = useCallback((error: unknown) => {
    if (typeof error === 'object' && error !== null) {
      const errObj = error as { status?: number; message?: string; detail?: any; name?: string };
      if (errObj.status === 409) {
        setError('이미 사용 중인 이름입니다.');
        return;
      }
    }

    setError('프로필 저장 중 오류가 발생했습니다.');
  }, []);

  return { error, setError, validateNickname, validateColor, handleApiError };
};

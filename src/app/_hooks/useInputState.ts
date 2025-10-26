import { useState, useCallback } from 'react';

/**
 * 입력 필드 상태를 관리하는 커스텀 훅
 * @param initialValue 초기값 (기본값: '')
 * @returns 상태 값과 변경 함수들
 */
export const useInputState = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  const setValue_ = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  return {
    value,
    setValue: setValue_,
    handleChange,
    handleClear,
  };
};

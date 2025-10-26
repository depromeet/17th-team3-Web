import { useState, useCallback } from 'react';

/**
 * BottomSheet의 열기/닫기 상태를 관리하는 커스텀 훅
 * @returns 상태와 제어 함수들
 */
export const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, open, close, toggle };
};

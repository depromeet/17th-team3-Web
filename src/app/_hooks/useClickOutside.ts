import { useEffect, RefObject, useCallback } from 'react';

/**
 * 요소 외부 클릭을 감지하는 커스텀 훅
 * @param ref 클릭을 감지할 요소의 ref
 * @param onClickOutside 외부 클릭 시 실행할 콜백
 */
export const useClickOutside = (ref: RefObject<HTMLElement>, onClickOutside: () => void) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    },
    [ref, onClickOutside]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);
};

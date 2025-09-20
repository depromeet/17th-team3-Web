import { UserRound } from 'lucide-react';

import { cn } from '@/app/_lib/cn';

/**
 * 빈 참석자 슬롯 컴포넌트의 Props
 */
interface EmptyAttendeeButtonProps {
  /** 현재 활성화된 슬롯인지 여부 */
  isActive: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick: () => void;
  /** 버튼 element ref */
  buttonRef?: React.RefCallback<HTMLButtonElement | null>;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 아직 참여하지 않은 참석자 자리를 나타내는 빈 슬롯 버튼 컴포넌트
 * 사용자가 클릭하여 빈 슬롯을 선택할 수 있음
 */
const EmptyAttendeeButton = ({
  isActive,
  onClick,
  buttonRef,
  className,
}: EmptyAttendeeButtonProps) => {
  return (
    <button
      ref={buttonRef}
      className={cn(
        'flex shrink-0 cursor-pointer flex-col items-center gap-2',
        isActive ? 'scale-115' : 'opacity-60',
        className
      )}
      type="button"
      onClick={onClick}
    >
      <div
        className={cn(
          'flex h-24 w-[4.75rem] shrink-0 items-center justify-center gap-2 rounded-[0.875rem] bg-neutral-200 body-3 font-semibold'
        )}
      >
        <UserRound className="h-12 w-12 text-neutral-300" />
      </div>
    </button>
  );
};

export default EmptyAttendeeButton;

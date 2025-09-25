import { UserRound } from 'lucide-react';

import PersonFillIcon from '@/app/_components/icons/PersonFillIcon';
import { cn } from '@/app/_lib/cn';

interface EmptyAttendeeButtonProps {
  isActive: boolean;
  onClick: () => void;
  buttonRef?: React.RefCallback<HTMLButtonElement | null>;
  className?: string;
}

const EmptyAttendeeButton = ({
  isActive,
  onClick,
  buttonRef,
  className,
}: EmptyAttendeeButtonProps) => {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className={cn(
        'flex shrink-0 cursor-pointer flex-col items-center gap-2 transition-all duration-200',
        isActive ? 'scale-115' : 'opacity-60',
        className
      )}
    >
      <div
        className={cn(
          'flex h-24 w-[4.75rem] shrink-0 items-center justify-center gap-2 rounded-[0.875rem] border border-neutral-300 bg-neutral-200 body-3 font-semibold'
        )}
        style={{
          boxShadow: '0 4px 12px 0 rgba(250, 165, 148, 0.50)',
        }}
      >
        <PersonFillIcon className="h-11 w-11 text-neutral-300" />
      </div>
    </button>
  );
};

export default EmptyAttendeeButton;

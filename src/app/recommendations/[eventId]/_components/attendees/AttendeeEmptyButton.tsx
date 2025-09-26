import AvatarChip from '@/app/_components/ui/AvatarChip';
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
    <button ref={buttonRef} type="button" onClick={onClick} className={className}>
      <AvatarChip variant="empty" className={cn(isActive ? 'scale-115' : 'opacity-60')} />
    </button>
  );
};

export default EmptyAttendeeButton;

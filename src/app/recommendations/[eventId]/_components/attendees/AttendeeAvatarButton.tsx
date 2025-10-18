import AvatarIcon from '@/app/_components/ui/AvatarIcon';
import { cn } from '@/app/_lib/cn';
import { Attendee } from '@/app/recommendations/[eventId]/_models/attendee';

interface AttendeeAvatarButtonProps {
  index: number;
  attendee: Attendee;
  isActive: boolean;
  onClick: () => void;
  buttonRef?: React.RefCallback<HTMLButtonElement | null>;
  className?: string;
}

const AttendeeAvatarButton = ({
  attendee,
  isActive,
  onClick,
  buttonRef,
  className,
}: AttendeeAvatarButtonProps) => {
  return (
    <button ref={buttonRef} type="button" onClick={onClick} className={className}>
      <AvatarIcon
        variant={attendee.avatarThemeKey}
        className={cn('cursor-pointer', isActive ? 'scale-115' : 'opacity-30')}
      />
    </button>
  );
};

export default AttendeeAvatarButton;

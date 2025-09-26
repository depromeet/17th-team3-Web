import Image from 'next/image';

import AvatarChip from '@/app/_components/ui/AvatarChip';
import MarqueeText from '@/app/_features/MarqueeText';
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
      <AvatarChip
        variant={attendee.avatarThemeKey}
        className={cn('cursor-pointer', isActive ? 'scale-115' : 'opacity-30')}
        name={attendee.name}
        isMarquee={isActive}
      />
    </button>
  );
};

export default AttendeeAvatarButton;

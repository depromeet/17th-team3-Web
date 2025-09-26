import Image from 'next/image';

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
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-24 w-19 shrink-0 snap-x snap-mandatory flex-col gap-1 rounded-xl bg-white px-1 pt-2 pb-4 font-semibold text-neutral-1500 transition-all duration-200',
        'cursor-pointer',
        isActive ? 'scale-115' : 'opacity-30',
        className
      )}
      style={{
        boxShadow: '0 4px 12px 0 rgba(250, 165, 148, 0.50)',
      }}
    >
      <div className="flex flex-1 items-center justify-center">
        <Image
          src={attendee.avatar}
          alt={attendee.name}
          width={48}
          height={48}
          className="h-12 w-12"
        />
      </div>
      {isActive ? (
        <MarqueeText className="body-3 text-orange-900">{attendee.name}</MarqueeText>
      ) : (
        <span className="line-clamp-1 body-3 text-orange-900">{attendee.name}</span>
      )}
    </button>
  );
};

export default AttendeeAvatarButton;

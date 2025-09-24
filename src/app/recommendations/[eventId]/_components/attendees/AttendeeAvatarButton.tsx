import { cn } from '@/app/_lib/cn';
import { Attendee } from '@/app/recommendations/[eventId]/_models/attendee';

/**
 * 참석자 아바타 버튼 컴포넌트의 Props
 */
interface AttendeeAvatarButtonProps {
  /** 참석자 인덱스 */
  index: number;
  /** 참석자 정보 */
  attendee: Attendee;
  /** 현재 활성화된 버튼인지 여부 */
  isActive: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick: () => void;
  /** 버튼 element ref */
  buttonRef?: React.RefCallback<HTMLButtonElement | null>;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 참석자의 아바타와 이름을 표시하는 클릭 가능한 버튼 컴포넌트
 * 활성 상태에 따라 스케일과 투명도가 변경됨
 */
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
        'flex h-24 w-19 shrink-0 snap-x snap-mandatory flex-col justify-center gap-2 rounded-[0.875rem] bg-white body-3 font-semibold text-neutral-1500 transition-all duration-200',
        'cursor-pointer',
        isActive ? 'scale-115' : 'opacity-60',
        className
      )}
    >
      <span className="text-3xl">{attendee.avatar}</span>
      <span className="text-neutral-1500">{attendee.name}</span>
    </button>
  );
};

export default AttendeeAvatarButton;

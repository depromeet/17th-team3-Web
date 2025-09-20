import { useEffect, useRef } from 'react';

import { cn } from '@/app/_lib/cn';
import AttendeeAvatarButton from '@/app/recommendations/_features/attendees/AttendeeAvatarButton';
import AttendeeReelSpacer from '@/app/recommendations/_features/attendees/AttendeeReelSpacer';
import EmptyAttendeeButton from '@/app/recommendations/_features/attendees/EmptyAttendeeButton';
import { useSnapSync } from '@/app/recommendations/_features/snap-sync/SnapSyncContext';
import { Attendee } from '@/app/recommendations/_mock/attendee.types';

const EMPTY_AVATAR_SLOTS_COUNT = 3;

/**
 * 참석자 아바타를 가로로 나열하여 보여주는 리얼 컴포넌트
 */
const AttendeeReel = () => {
  const { attendeesData, activeAttendeeId, navigateToAttendee, attendeeAvatarRefs } = useSnapSync();
  const hasInitialCentered = useRef(false);

  const { attendees } = attendeesData;

  // 초기 로드 시 한 번만 아바타 중앙 정렬
  useEffect(() => {
    if (hasInitialCentered.current) return;

    const activeAvatarElement = attendeeAvatarRefs.current[activeAttendeeId];
    if (!activeAvatarElement) return;

    // DOM 배치 완료 후 실행을 위한 requestAnimationFrame
    requestAnimationFrame(() => {
      activeAvatarElement.scrollIntoView({
        behavior: 'auto',
        inline: 'center',
        block: 'nearest',
      });
      hasInitialCentered.current = true;
    });
  }, [activeAttendeeId, attendeeAvatarRefs]);

  const emptyAvatarSlotsCount = Math.max(0, attendeesData.totalAttendees - attendees.length);

  return (
    <div
      className={cn(
        'scrollbar-hide no-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-5 py-6',
        'touch-pan-x'
      )}
    >
      {Array.from({ length: EMPTY_AVATAR_SLOTS_COUNT }, (_, index) => (
        <AttendeeReelSpacer key={`spacer-${index}`} />
      ))}

      {attendees.map((attendee: Attendee) => {
        const isActiveAttendee = activeAttendeeId === attendee.id;

        return (
          <AttendeeAvatarButton
            key={attendee.id}
            buttonRef={(element) => {
              attendeeAvatarRefs.current[attendee.id] = element;
            }}
            attendee={attendee}
            isActive={isActiveAttendee}
            onClick={() => navigateToAttendee(attendee.id)}
          />
        );
      })}

      {Array.from({ length: emptyAvatarSlotsCount }, (_, index) => {
        const emptySlotId = `empty-card-${index}`;
        const isActiveEmptySlot = activeAttendeeId === emptySlotId;

        return (
          <EmptyAttendeeButton
            key={emptySlotId}
            buttonRef={(element) => {
              attendeeAvatarRefs.current[emptySlotId] = element;
            }}
            isActive={isActiveEmptySlot}
            onClick={() => navigateToAttendee(emptySlotId)}
          />
        );
      })}
    </div>
  );
};

export default AttendeeReel;

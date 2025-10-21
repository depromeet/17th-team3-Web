import { cn } from '@/app/_lib/cn';
import AttendeeAvatarButton from '@/app/events/[eventId]/overview/_components/attendees/AttendeeAvatarButton';
import EmptyAttendeeButton from '@/app/events/[eventId]/overview/_components/attendees/AttendeeEmptyButton';
import { useSnapSync } from '@/app/events/[eventId]/overview/_context/SnapSyncContext';
import { Attendee } from '@/app/events/[eventId]/overview/_models/attendee';

const AttendeeReel = () => {
  const { attendeesData, activeAttendeeId, navigateToAttendee, attendeeAvatarRefs } = useSnapSync();

  const { attendees } = attendeesData;

  const emptyAvatarSlotsCount = Math.max(0, attendeesData.totalAttendees - attendees.length);

  return (
    <div
      className={cn(
        'scrollbar-hide no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pt-6 pr-5 pb-6',
        'pl-[calc(50%-2.375rem)]'
      )}
    >
      {attendees.map((attendee: Attendee, index: number) => {
        const isActiveAttendee = activeAttendeeId === attendee.id;

        return (
          <AttendeeAvatarButton
            key={attendee.id}
            buttonRef={(element) => {
              attendeeAvatarRefs.current[attendee.id] = element;
            }}
            index={index}
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

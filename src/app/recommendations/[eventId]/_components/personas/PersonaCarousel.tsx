import PersonaCard from '@/app/recommendations/[eventId]/_components/personas/PersonaCard';
import EmptyPersonaCard from '@/app/recommendations/[eventId]/_components/personas/PersonaEmptyCard';
import { useSnapSync } from '@/app/recommendations/[eventId]/_context/SnapSyncContext';
import { Attendee } from '@/app/recommendations/[eventId]/_models/attendee';

const CarouselEdgeSpacer = () => {
  return <div className={`w-5 shrink-0`} />;
};

const PersonaCarousel = () => {
  const { attendeesData, attendeeCardRefs, cardsContainerRef } = useSnapSync();

  const { attendees, totalAttendees } = attendeesData;
  const hasEmptySlots = attendees.length < attendeesData.totalAttendees;

  return (
    <div className="flex flex-1 flex-row overflow-x-hidden">
      <div
        className="no-scrollbar flex w-full touch-pan-x snap-x snap-mandatory flex-row gap-4 overflow-x-auto scroll-smooth px-5"
        ref={cardsContainerRef}
      >
        <CarouselEdgeSpacer />
        {attendees.map((attendee: Attendee, index: number) => (
          <PersonaCard
            key={attendee.id}
            cardRef={(element) => {
              attendeeCardRefs.current[attendee.id] = element;
            }}
            index={index}
            totalAttendeesCount={totalAttendees}
            attendee={attendee}
            className="snap-center"
          />
        ))}
        {hasEmptySlots && (
          <EmptyPersonaCard
            cardRef={(element) => {
              attendeeCardRefs.current['empty-card'] = element;
            }}
            className="snap-center"
          />
        )}
        {hasEmptySlots && <CarouselEdgeSpacer />}
      </div>
    </div>
  );
};

export default PersonaCarousel;

import EmptyPersonaCard from '@/app/recommendations/_features/personas/EmptyPersonaCard';
import PersonaCard from '@/app/recommendations/_features/personas/PersonaCard';
import { useSnapSync } from '@/app/recommendations/_features/snap-sync/SnapSyncContext';
import { Attendee } from '@/app/recommendations/_mock/attendee.types';

const CARD_SPACING_PERCENTAGE = 0.8;

/**
 * 참석자들의 선호도 카드를 가로로 스크롤할 수 있는 캐러셀 컴포넌트
 */
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
        {attendees.map((attendee: Attendee, index: number) => (
          <PersonaCard
            key={attendee.id}
            cardRef={(element) => {
              attendeeCardRefs.current[attendee.id] = element;
            }}
            data-id={attendee.id}
            attendeeIndex={index}
            totalAttendeesCount={totalAttendees}
            attendeeData={attendee}
            className="snap-center"
          />
        ))}
        {hasEmptySlots && (
          <EmptyPersonaCard
            className="snap-center"
            data-id="empty-card"
            cardRef={(element) => {
              attendeeCardRefs.current['empty-card'] = element;
            }}
          />
        )}
        {hasEmptySlots && <div className={`w-[${CARD_SPACING_PERCENTAGE}%] shrink-0`} />}
      </div>
    </div>
  );
};

export default PersonaCarousel;

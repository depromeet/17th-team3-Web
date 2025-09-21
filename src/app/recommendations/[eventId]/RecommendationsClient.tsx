'use client';

import Button from '@/app/_components/ui/Button';
import AttendeeReel from '@/app/recommendations/[eventId]/_features/attendees/AttendeeReel';
import PersonaCarousel from '@/app/recommendations/[eventId]/_features/personas/PersonaCarousel';
import { SnapSyncProvider } from '@/app/recommendations/[eventId]/_features/snap-sync/SnapSyncContext';
import { AttendeesData } from '@/app/recommendations/[eventId]/_mock/attendee.types';

interface RecommendationsClientProps {
  attendeesData: AttendeesData;
}

const RecommendationsClient = ({ attendeesData }: RecommendationsClientProps) => {
  return (
    <SnapSyncProvider attendeesData={attendeesData}>
      <AttendeeReel />
      <PersonaCarousel />
      <div className="sticky bottom-0 flex flex-col gap-3 rounded-t-3xl px-5 pt-9 pb-6 button-area">
        <div className="flex flex-row justify-center gap-1 label-1">
          <span className="label-1 font-semibold text-orange-900">설문 마감까지</span>
          <span className="label-1 font-semibold text-orange-500">1일 3시간 24분</span>
        </div>
        <Button theme="cta-gradient">추천 결과 보기</Button>
      </div>
    </SnapSyncProvider>
  );
};

export default RecommendationsClient;

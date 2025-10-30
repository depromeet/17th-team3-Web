'use client';

import { useRouter } from 'next/navigation';

import Button from '@/app/_components/ui/Button';
import AttendeeReel from '@/app/recommendations/[eventId]/_components/attendees/AttendeeReel';
import PersonaCarousel from '@/app/recommendations/[eventId]/_components/personas/PersonaCarousel';
import { SnapSyncProvider } from '@/app/recommendations/[eventId]/_context/SnapSyncContext';
import { AttendeesData } from '@/app/recommendations/[eventId]/_models/attendee';

interface RecommendationsClientProps {
  attendeesData: AttendeesData;
}

const RecommendationsClient = ({ attendeesData }: RecommendationsClientProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/recommendations/sAmCHo/result`);
  };
  return (
    <SnapSyncProvider attendeesData={attendeesData}>
      <AttendeeReel />
      <PersonaCarousel />
      <div className="sticky bottom-0 flex flex-col gap-3 rounded-t-3xl px-5 pt-9 pb-6 button-area">
        <div className="flex flex-row justify-center gap-1 label-1">
          <span className="label-1 font-semibold text-orange-900">설문 마감까지</span>
          <span className="label-1 font-semibold text-red-600">1일 3시간 24분</span>
        </div>
        <Button theme="cta-gradient" onClick={handleClick}>
          추천 결과 보기
        </Button>
      </div>
    </SnapSyncProvider>
  );
};

export default RecommendationsClient;

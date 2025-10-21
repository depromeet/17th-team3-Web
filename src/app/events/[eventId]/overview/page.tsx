import { Flame, MapPin } from 'lucide-react';

import { attendeesMockData } from '@/app/events/[eventId]/overview/_mocks/attendees.mock';
import RecommendationsClient from '@/app/events/[eventId]/overview/RecommendationsClient';

interface IconChipProps {
  icon: React.ReactNode;
  label: string;
}

const IconChip = ({ icon, label }: IconChipProps) => {
  return (
    <div className="flex h-7 flex-row items-center gap-0.5 border-b border-neutral-300 pr-2">
      {icon}
      <span className="label-1 font-semibold text-neutral-1400">{label}</span>
    </div>
  );
};

//--------------------------------Page--------------------------------

interface OverviewPageProps {
  params: Promise<{ eventId: string }>;
}

const OverviewPage = async ({ params }: OverviewPageProps) => {
  const { eventId: _eventId } = await params;

  const remainingAttendeesCount =
    attendeesMockData.totalAttendees - attendeesMockData.attendees.length;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-3">
        <div className="mx-auto flex flex-row gap-4">
          <IconChip
            icon={<Flame className="h-4 w-4 scale-x-[-1] text-orange-500" absoluteStrokeWidth />}
            label={`한국고 동창 모임`}
          />
          <IconChip
            icon={<MapPin className="h-4 w-4 text-orange-500" absoluteStrokeWidth />}
            label="강남역"
          />
        </div>
        <h1 className="mx-auto heading-3 font-bold text-orange-900">
          {remainingAttendeesCount}명 더 참여해야 식당이 추천돼요
        </h1>
      </div>
      <RecommendationsClient attendeesData={attendeesMockData} />
    </div>
  );
};
export default OverviewPage;

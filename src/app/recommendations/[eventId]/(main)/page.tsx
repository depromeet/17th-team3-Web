import { Flame, MapPin } from 'lucide-react';

import RecommendationsClient from '@/app/recommendations/[eventId]/_components/RecommendationsClient';
import { attendeesMockData } from '@/app/recommendations/[eventId]/_mocks/attendees.mock';

interface IconChipProps {
  icon: React.ReactNode;
  label: string;
}

const IconChip = ({ icon, label }: IconChipProps) => {
  return (
    <div className="flex h-7 flex-row items-center gap-0.5 rounded-[5rem] bg-white pr-4 pl-4">
      {icon}
      <span className="label-1 font-semibold text-neutral-1400"> {label}</span>
    </div>
  );
};

interface RecommendationsPageProps {
  params: Promise<{ eventId: string }>;
}

const RecommendationsPage = async ({ params }: RecommendationsPageProps) => {
  const { eventId } = await params;

  const remainingAttendeesCount =
    attendeesMockData.totalAttendees - attendeesMockData.attendees.length;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-2">
        <div className="mx-auto flex flex-row gap-2">
          <IconChip
            icon={<Flame className="h-4 w-4 text-orange-500" absoluteStrokeWidth />}
            label={`한국고 동창 모임`}
          />
          <IconChip
            icon={<MapPin className="h-4 w-4 text-green-600" absoluteStrokeWidth />}
            label="강남역"
          />
        </div>
        <div className="mx-auto heading-3 font-bold">
          <span className="text-orange-500">{remainingAttendeesCount}명 더 참여해야 </span>
          <span className="text-orange-900">식당이 추천돼요</span>
        </div>
      </div>
      <RecommendationsClient attendeesData={attendeesMockData} />
    </div>
  );
};
export default RecommendationsPage;

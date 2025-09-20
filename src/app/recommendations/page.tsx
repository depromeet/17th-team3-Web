import { Flame, MapPin } from 'lucide-react';

import IconChip from '@/app/recommendations/_components/IconChip';
import { attendeesMockData } from '@/app/recommendations/_mock/attendee.mock';
import RecommendationsClient from '@/app/recommendations/RecommendationsClient';

/**
 * 추천 페이지 컴포넌트
 * 참석자들의 선호도를 확인하고 식당을 추천받을 수 있는 페이지
 */
const RecommendationsPage = () => {
  const remainingAttendeesCount =
    attendeesMockData.totalAttendees - attendeesMockData.attendees.length;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-2">
        <div className="mx-auto flex flex-row gap-2">
          <IconChip
            icon={<Flame className="h-4 w-4 text-orange-500" absoluteStrokeWidth />}
            label="한국고 동창 모임"
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

import { ChevronRight } from 'lucide-react';

import AvatarList from '@/app/_components/ui/AvatarList';

interface Meeting {
  id: number;
  name: string;
  hostUserId: number;
  attendeeCount: number;
  isClosed: boolean;
  stationId: number;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}

interface EndedMeetingCardProps {
  meeting: Meeting;
}

// TODO: API 연동 후 실제 아바타 데이터로 교체
const MOCK_AVATARS = [
  '/images/avatar/chocolate.svg',
  '/images/avatar/grape.svg',
  '/images/avatar/orange.svg',
  '/images/avatar/milk.svg',
];

const EndedMeetingCard = ({ meeting }: EndedMeetingCardProps) => {
  const { name, stationId, attendeeCount } = meeting;

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-gray-100 p-4">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <h3 className="subheading-2 font-bold">{name}</h3>
          <ChevronRight size={24} className="text-neutral-800" />
        </div>

        <div className="flex items-center gap-2 label-2 font-medium text-neutral-800">
          {/* TODO: stationId를 stationName으로 변환 */}
          <p>{stationId}</p>
          <div className="h-[3px] w-[3px] rounded-full bg-neutral-800" />
          {/* TODO: endAt 데이터 포맷팅 */}
          <p>2025.09.03(수) 오후 6:00</p>
        </div>
      </div>

      <AvatarList avatars={MOCK_AVATARS} additionalCount={attendeeCount} />
    </div>
  );
};

export default EndedMeetingCard;

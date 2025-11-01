import { ChevronRight } from 'lucide-react';

import { Meeting } from '@/app/(home)/_models/types';
import AvatarList from '@/app/_components/ui/AvatarList';
import { formatDateTime } from '@/app/_utils/format';

interface EndedMeetingCardProps {
  meeting: Meeting;
  onClick?: () => void;
}

// TODO: API 연동 후 실제 아바타 데이터로 교체
const MOCK_AVATARS = [
  '/images/avatar/chocolate.svg',
  '/images/avatar/grape.svg',
  '/images/avatar/orange.svg',
  '/images/avatar/milk.svg',
];

const EndedMeetingCard = ({ meeting, onClick }: EndedMeetingCardProps) => {
  const { title, stationName, totalParticipantCnt, endAt } = meeting;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onClick?.();
        }
      }}
      className="flex cursor-pointer flex-col gap-3 rounded-2xl bg-gray-100 p-4 select-none"
    >
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <h3 className="subheading-2 font-bold">{title}</h3>
          <ChevronRight size={24} className="text-neutral-800" />
        </div>

        <div className="flex items-center gap-2 label-2 font-medium text-neutral-800">
          <p>{stationName}</p>
          <div className="h-[3px] w-[3px] rounded-full bg-neutral-800" />
          <p>{formatDateTime(endAt)}</p>
        </div>
      </div>

      <AvatarList avatars={MOCK_AVATARS} additionalCount={totalParticipantCnt} />
    </div>
  );
};

export default EndedMeetingCard;

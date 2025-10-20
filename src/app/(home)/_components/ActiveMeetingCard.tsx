import { CalendarDays, Check, ChevronRight, Clock, MapPin } from 'lucide-react';

import AvatarList from '@/app/_components/ui/AvatarList';
import StepIndicator from '@/app/_components/ui/StepIndicator';

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

interface ActiveMeetingCardProps {
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

const ActiveMeetingCard = ({ meeting, onClick }: ActiveMeetingCardProps) => {
  const { name, attendeeCount } = meeting;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
      className="cursor-pointer rounded-3xl p-3 pt-4 select-none background-3"
    >
      <div className="flex flex-col gap-4 px-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-1 border-b-1 border-b-neutral-300 pr-2">
              <Clock size={14} strokeWidth={3} className="text-orange-300" />
              <p className="label-1 text-[14px] font-medium text-orange-600">1일 00:02:30</p>
            </div>
            <ChevronRight size={24} className="text-orange-500" />
          </div>

          <h3 className="heading-4 text-xl leading-8 font-bold text-orange-1000">{name}</h3>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MapPin size={16} strokeWidth={2} className="text-neutral-400" />
              <p className="label-2 leading-[22px] text-neutral-600">만나는 장소</p>
            </div>
            <p className="label-2 text-neutral-1200">강남역</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <CalendarDays size={16} strokeWidth={2} className="text-neutral-400" />
              <p className="label-2 leading-[22px] text-neutral-600">설문 종료 일시</p>
            </div>
            <p className="label-2 text-neutral-1200">2025.09.03(수) 오후 6:00</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-white px-4 py-3">
        <div className="py-2">
          <StepIndicator total={attendeeCount} value={3} />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <Check size={12} strokeWidth={4} className="rounded-full text-orange-500" />
            <div className="label-2 font-semibold text-orange-600">모임 만들기</div>
          </div>
          <div className="label-2 font-semibold text-neutral-700">식당 추천 시작!</div>
        </div>
      </div>
    </div>
  );
};

export default ActiveMeetingCard;

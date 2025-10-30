import { CalendarDays, ChevronRight, Clock, MapPin } from 'lucide-react';

import CountdownDisplay from '@/app/(home)/_components/CountdownDisplay';
import { Meeting } from '@/app/(home)/_models/types';
import MeetingParticipantProgress from '@/app/_components/ui/MeetingParticipantProgress';
import { formatDateTime } from '@/app/_utils/format';

interface ActiveMeetingCardProps {
  meeting: Meeting;
  onClick?: () => void;
}

const ActiveMeetingCard = ({ meeting, onClick }: ActiveMeetingCardProps) => {
  const { title, stationName, totalParticipantCnt, endAt } = meeting;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
      className="cursor-pointer rounded-3xl p-3 pt-4 select-none gathering-card"
    >
      <div className="flex flex-col gap-4 px-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-1 border-b-1 border-b-neutral-300 pr-2">
              <Clock size={14} strokeWidth={3} className="text-orange-300" />
              <CountdownDisplay endAt={endAt} />
            </div>
            <ChevronRight size={24} className="text-orange-500" />
          </div>

          <h3 className="heading-4 text-xl leading-8 font-bold text-orange-1000">{title}</h3>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MapPin size={16} strokeWidth={2} className="text-neutral-400" />
              <p className="label-2 leading-[22px] text-neutral-600">만나는 장소</p>
            </div>
            <p className="label-2 text-neutral-1200">{stationName}역</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <CalendarDays size={16} strokeWidth={2} className="text-neutral-400" />
              <p className="label-2 leading-[22px] text-neutral-600">설문 종료 일시</p>
            </div>
            <p className="label-2 text-neutral-1200">{formatDateTime(endAt)}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-white px-4 py-3 pt-11">
        <MeetingParticipantProgress
          surveyCompletedParticipants={2} // TODO: API 구현 후, 설문 참여 인원으로 변경 필요
          totalParticipants={totalParticipantCnt}
        />
      </div>
    </div>
  );
};

export default ActiveMeetingCard;

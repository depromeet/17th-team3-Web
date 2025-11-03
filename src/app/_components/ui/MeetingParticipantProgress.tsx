import { Check } from 'lucide-react';
import Image from 'next/image';

import StepIndicator from '@/app/_components/ui/StepIndicator';
import { getProgressPercent } from '@/app/_utils/ui';

interface MeetingParticipantProgressProps {
  surveyCompletedParticipants: number;
  totalParticipants: number;
}

const MeetingParticipantProgress = ({
  surveyCompletedParticipants,
  totalParticipants,
}: MeetingParticipantProgressProps) => {
  const progressPercent = getProgressPercent(surveyCompletedParticipants, totalParticipants);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center">
        <div className="flex-1">
          <div className="relative">
            <div
              className="absolute -top-11 -translate-x-1/2 transition-all"
              style={{ left: `${progressPercent}%` }}
            >
              <div className="flex h-7 w-18 justify-center gap-1 rounded-full bg-orange-100 px-2 py-0.5">
                <Image
                  alt="그룹 아이콘"
                  src="/icons/people-fill.svg"
                  width={16}
                  height={0}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <span className="font-bold text-orange-600">{surveyCompletedParticipants}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-400">{totalParticipants}</span>
              </div>

              <div className="absolute top-full left-1/2 -translate-x-1/2">
                <div className="h-0 w-0 border-t-8 border-r-8 border-l-8 border-t-orange-50 border-r-transparent border-l-transparent" />
              </div>
            </div>

            <StepIndicator value={surveyCompletedParticipants} total={totalParticipants} />
          </div>
        </div>

        <div className="z-1 -ml-6 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100">
          <Image alt="과녁 아이콘" src="/icons/arrow.svg" width={16} height={16} />
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Check size={12} strokeWidth={4} className="rounded-full text-orange-500" />
          <div className="label-2 font-semibold text-orange-600">모임 만들기</div>
        </div>
        <div className="label-2 font-semibold text-neutral-700">식당 추천 시작!</div>
      </div>
    </div>
  );
};

export default MeetingParticipantProgress;

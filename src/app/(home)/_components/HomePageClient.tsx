'use client';

import {
  ActiveMeetingCard,
  EmptyActiveMeetingCard,
  EndedMeetingCard,
  SectionHeader,
} from '@/app/(home)/_components';
import { useMeetingsByStatus } from '@/app/(home)/_hooks/useMeetingsByStatus';
import { Meeting } from '@/app/(home)/_models/types';
import { cn } from '@/app/_lib/cn';

interface HomePageClientProps {
  meetings: Meeting[];
}

/**
 * 홈 페이지의 클라이언트 컴포넌트
 * 진행 중인 모임과 나의 모임 정보를 렌더링합니다.
 * useMeetingsByStatus 훅을 사용하여 5분마다 자동 업데이트됩니다.
 *
 * @param meetings - API에서 받은 모임 데이터 배열
 */
const HomePageClient = ({ meetings }: HomePageClientProps) => {
  const { activeMeetings, endedMeetings } = useMeetingsByStatus(meetings);

  return (
    <>
      {/* 진행 중인 모임 */}
      <section className="py-2">
        <SectionHeader title="진행 중인 모임" icon="/images/avatar/orange.svg" />
        <div
          className={cn(
            'no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-5',
            activeMeetings.length === 1 && 'justify-center'
          )}
        >
          {activeMeetings.length > 0 ? (
            activeMeetings.map((meeting) => (
              <div key={meeting.id} className="min-w-[320px] shrink-0 snap-center">
                <ActiveMeetingCard
                  meeting={meeting}
                  onClick={() => {
                    // TODO: 모임현황 페이지로 이동
                  }}
                />
              </div>
            ))
          ) : (
            <EmptyActiveMeetingCard />
          )}
        </div>
      </section>

      {/* 나의 모임 */}
      <section>
        <SectionHeader title="나의 모임" icon="/images/avatar/matcha.svg" />
        <div className="flex flex-col gap-3 px-5 pb-20">
          {endedMeetings.length > 0 ? (
            endedMeetings.map((meeting) => (
              <EndedMeetingCard
                key={meeting.id}
                meeting={meeting}
                onClick={() => {
                  // TODO: 모임결과 페이지로 이동
                }}
              />
            ))
          ) : (
            <p className="mx-auto px-5 py-[1.25rem] body-3 leading-6 font-medium text-neutral-800">
              이전 모임이 없어요
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePageClient;

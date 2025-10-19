'use client';

import Image from 'next/image';

import {
  ActiveMeetingCard,
  EmptyActiveMeetingCard,
  EndedMeetingCard,
  SectionHeader,
} from '@/app/(home)/_components';
import FloatingActionButton from '@/app/_components/ui/FloatingActionButton';

// import { meetingsApi } from '@/app/_services/meetings';

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

const HomePage = () => {
  // const createMeeting = async () => {
  //   const data = await meetingsApi.getMeetings();
  // };

  const activeMeetings = MOCK_DATA.filter((meeting) => !meeting.isClosed);
  const endedMeetings = MOCK_DATA.filter((meeting) => meeting.isClosed);

  return (
    <div className="no-scrollbar flex h-[100dvh] flex-col overflow-auto bg-neutral-100">
      <header className="px-5 pt-9 pb-5 select-none">
        <Image src="/images/momuzzi-wordmark.svg" alt="모무찌 작은 로고" width={72} height={26} />
        {/* TODO: 앱 전환 후, 프로필 아이콘 추가 */}
      </header>

      <main>
        {/* 진행 중인 모임 */}
        <section className="py-2">
          <SectionHeader title="진행 중인 모임" icon="/images/avatar/orange.svg" />
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-5">
            {activeMeetings.length > 0 ? (
              activeMeetings.map((meeting) => (
                <div key={meeting.id} className="min-w-[320px] shrink-0 snap-center">
                  <ActiveMeetingCard meeting={meeting} onClick={() => console.log('1111')} />
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
                  onClick={() => console.log('2222')}
                />
              ))
            ) : (
              <p className="mx-auto px-5 py-[1.25rem] body-3 leading-6 font-medium text-neutral-800">
                이전 모임이 없어요
              </p>
            )}
          </div>
        </section>
      </main>

      <FloatingActionButton />
    </div>
  );
};

// TODO: API 연동 후 실제 데이터로 교체
const MOCK_DATA: Meeting[] = [
  {
    id: 1,
    name: '저녁 모무찌',
    hostUserId: 123,
    attendeeCount: 3,
    isClosed: true,
    stationId: 1,
    endAt: '2024-12-31T18:00:00',
    createdAt: '2024-12-25T10:00:00',
    updatedAt: '2024-12-25T15:30:00',
  },
  {
    id: 2,
    name: '저녁 모무찌2',
    hostUserId: 123,
    attendeeCount: 6,
    isClosed: true,
    stationId: 1,
    endAt: '2024-12-31T18:00:00',
    createdAt: '2024-12-25T10:00:00',
    updatedAt: '2024-12-25T15:30:00',
  },
  {
    id: 3,
    name: '저녁 모무찌3',
    hostUserId: 123,
    attendeeCount: 8,
    isClosed: false,
    stationId: 1,
    endAt: '2024-12-31T18:00:00',
    createdAt: '2024-12-25T10:00:00',
    updatedAt: '2024-12-25T15:30:00',
  },
  {
    id: 4,
    name: '저녁 모무찌4',
    hostUserId: 123,
    attendeeCount: 10,
    isClosed: true,
    stationId: 1,
    endAt: '2024-12-31T18:00:00',
    createdAt: '2024-12-25T10:00:00',
    updatedAt: '2024-12-25T15:30:00',
  },
  {
    id: 5,
    name: '저녁 모무찌555',
    hostUserId: 123,
    attendeeCount: 5,
    isClosed: false,
    stationId: 1,
    endAt: '2024-12-31T18:00:00',
    createdAt: '2024-12-25T10:00:00',
    updatedAt: '2024-12-25T15:30:00',
  },
  {
    id: 6,
    name: '저녁 모무찌666',
    hostUserId: 123,
    attendeeCount: 77,
    isClosed: false,
    stationId: 1,
    endAt: '2024-12-31T18:00:00',
    createdAt: '2024-12-25T10:00:00',
    updatedAt: '2024-12-25T15:30:00',
  },
];

export default HomePage;

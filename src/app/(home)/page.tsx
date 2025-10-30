import { parseEnv } from 'util';

import { Suspense } from 'react';

import { HomePageLayout, HomePageClient, Skeleton } from '@/app/(home)/_components';
import { meetingsApi } from '@/app/_services/meetings';

const HomePageContent = async () => {
  // const meetings = await meetingsApi.getMeetings();
  const meetings = [
    {
      id: 1,
      title: 'asdfsadf',
      hostUserId: 3,
      totalParticipantCnt: 4,
      isClosed: false,
      stationName: 'string',
      endAt: '2025-12-10T00:00:00',
      createdAt: '2025-12-10T00:00:00',
      updatedAt: '2025-12-10T00:00:00',
      participantList: [
        {
          userId: 4,
          attendeeNickname: 'cvcvcvc',
          color: 'fffffffffff',
        },
      ],
    },
    {
      id: 2,
      title: 'asdfsadf',
      hostUserId: 3,
      totalParticipantCnt: 14,
      isClosed: true,
      stationName: 'string',
      endAt: '2025-10-10T00:00:00',
      createdAt: '2025-10-10T00:00:00',
      updatedAt: '2025-12-10T00:00:00',
      participantList: [
        {
          userId: 4,
          attendeeNickname: 'cvcvcvc',
          color: 'fffffffffff',
        },
      ],
    },
  ];
  return <HomePageClient meetings={meetings} />;
};

const HomePage = () => {
  return (
    <HomePageLayout>
      <Suspense
        fallback={
          <>
            <Skeleton />
            <Skeleton />
          </>
        }
      >
        <HomePageContent />
      </Suspense>
    </HomePageLayout>
  );
};

export default HomePage;

export interface MeetingInfo {
  id: number;
  title: string;
  hostUserId: number;
  totalParticipantCnt: number;
  isClosed: boolean;
  stationName: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Participant {
  userId: number;
  attendeeNickname: string;
  color: string; // TODO: 아이콘 Union 타입으로 변경 필요
}

export interface Meeting extends MeetingInfo {
  participantList: Participant[];
}

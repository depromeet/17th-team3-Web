import { Suspense } from 'react';

import { HomePageLayout, HomePageClient, Skeleton } from '@/app/(home)/_components';
// import { meetingsApi } from '@/app/_services/meetings';

const HomePageContent = async () => {
  const meetings = [
    {
      id: 1,
      title: '강남역 저녁 약속',
      stationName: '강남',
      totalParticipantCnt: 5,
      endAt: '2025-11-02T00:00:00',
      participantList: [
        { userId: 1, attendeeNickname: '사용자1', color: 'orange' },
        { userId: 2, attendeeNickname: '사용자2', color: 'orange' },
      ],
      hostUserId: 1,
      isClosed: false,
      createdAt: '2025-10-02T00:00:00',
      updatedAt: '2025-10-02T00:00:00',
    },
    {
      id: 3,
      title: '강남역 저녁 약속',
      stationName: '강남',
      totalParticipantCnt: 10,
      endAt: '2025-11-02T00:00:00',
      participantList: [
        { userId: 1, attendeeNickname: '사용자1', color: 'orange' },
        { userId: 2, attendeeNickname: '사용자2', color: 'orange' },
      ],
      hostUserId: 1,
      isClosed: false,
      createdAt: '2025-10-02T00:00:00',
      updatedAt: '2025-10-02T00:00:00',
    },
    {
      id: 2,
      title: '강남역 저녁 약속22',
      stationName: '강남',
      totalParticipantCnt: 8,
      endAt: '2025-10-30T00:00:00',
      participantList: [
        { userId: 1, attendeeNickname: '사용자1', color: 'orange' },
        { userId: 2, attendeeNickname: '사용자2', color: 'orange' },
      ],
      hostUserId: 1,
      isClosed: true,
      createdAt: '2025-10-02T00:00:00',
      updatedAt: '2025-10-02T00:00:00',
    },
  ];
  // const meetings = await meetingsApi.getMeetings();
  return <HomePageClient meetings={meetings} />;
};

const HomeSkeleton = () => (
  <>
    <Skeleton />
    <Skeleton />
  </>
);

const HomePage = () => {
  return (
    <HomePageLayout>
      <Suspense fallback={<HomeSkeleton />}>
        <HomePageContent />
      </Suspense>
    </HomePageLayout>
  );
};

export default HomePage;

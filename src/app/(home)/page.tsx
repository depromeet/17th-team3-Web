import { Suspense } from 'react';

import { HomePageLayout, HomePageClient, Skeleton } from '@/app/(home)/_components';
import { Meeting } from '@/app/(home)/_models/types';
import { meetingsApi } from '@/app/_services/meetings';

const HomePageContent = async () => {
  const meetings: Meeting[] = await meetingsApi.getMeetings();
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

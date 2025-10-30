import { Suspense } from 'react';

import { HomePageLayout, HomePageClient, Skeleton } from '@/app/(home)/_components';
import { meetingsApi } from '@/app/_services/meetings';

const HomePageContent = async () => {
  const meetings = await meetingsApi.getMeetings();
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

import { Suspense } from 'react';

import { HomePageClient } from '@/app/(home)/_components';
import { meetingsApi } from '@/app/_services/meetings';

const HomePageContent = async () => {
  const meetings = await meetingsApi.getMeetings();
  return <HomePageClient meetings={meetings} />;
};

const HomePage = () => {
  return (
    <Suspense
      fallback={<div className="flex h-[100dvh] items-center justify-center">로딩중...</div>}
    >
      <HomePageContent />
    </Suspense>
  );
};

export default HomePage;

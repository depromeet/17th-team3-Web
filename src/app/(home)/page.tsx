import { Suspense } from 'react';

import { HomePageClient } from '@/app/(home)/_components';
import Loading from '@/app/_components/ui/Loading';
import { meetingsApi } from '@/app/_services/meetings';

const HomePageContent = async () => {
  const meetings = await meetingsApi.getMeetings();
  return <HomePageClient meetings={meetings} />;
};

const HomePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HomePageContent />
    </Suspense>
  );
};

export default HomePage;

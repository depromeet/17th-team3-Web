import { Suspense } from 'react';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { ApiError } from '@/app/_models/api';
import { getOverviewQueryOptions } from '@/app/_queries/overviewQueries';
import { MeetingOverview } from '@/app/_services/overview';
import OverviewSkeleton from '@/app/events/[eventId]/overview/_components/Skeleton';
import OverviewClient from '@/app/events/[eventId]/overview/OverviewClient';

interface OverviewPageProps {
  params: Promise<{ eventId: string }>;
}

const OverviewPageContent = async ({ params }: OverviewPageProps) => {
  const { eventId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<MeetingOverview, ApiError>({
    ...getOverviewQueryOptions(Number(eventId)),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <OverviewClient />
    </HydrationBoundary>
  );
};

const OverviewPage = async ({ params }: OverviewPageProps) => {
  return (
    <Suspense fallback={<OverviewSkeleton />}>
      <OverviewPageContent params={params} />
    </Suspense>
  );
};
export default OverviewPage;

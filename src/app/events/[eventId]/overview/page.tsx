import { Suspense } from 'react';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

import { ERROR_CODES } from '@/app/_constants/errorCodes';
import { ApiError } from '@/app/_models/api';
import { getOverviewQueryOptions } from '@/app/_queries/overviewQueries';
import { MeetingOverview } from '@/app/_services/overview';
import { isAccessDenied } from '@/app/_utils/errorGuards';
import OverviewSkeleton from '@/app/events/[eventId]/overview/_components/Skeleton';
import OverviewClient from '@/app/events/[eventId]/overview/OverviewClient';

interface OverviewPageProps {
  params: Promise<{ eventId: string }>;
}

const OverviewPageContent = async ({ params }: OverviewPageProps) => {
  const { eventId } = await params;

  const queryClient = new QueryClient();

  let apiError: ApiError | null = null;

  try {
    await queryClient.fetchQuery<MeetingOverview, ApiError>({
      ...getOverviewQueryOptions(Number(eventId)),
    });
  } catch (error) {
    apiError = error as ApiError;
  }

  if (apiError) {
    if (isAccessDenied(apiError)) {
      return redirect(`/?error=${apiError.code}`);
    }

    return redirect('/');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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

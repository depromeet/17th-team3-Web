'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';

import TopNavigation from '@/app/_components/layout/TopNavigation';

const RestaurantsNavigation = ({ eventId }: { eventId: string }) => {
  const router = useRouter();
  const [picks] = useQueryState('picks', parseAsInteger.withDefault(5));

  const analysisUrl = `/events/${eventId}/analysis?picks=${picks}`;

  const goToAnalysis = () => {
    if (picks) {
      router.replace(analysisUrl);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    if (picks) {
      router.prefetch(analysisUrl);
    }
  }, [analysisUrl, picks, router]);

  return (
    <TopNavigation
      showBackButton
      className="text-white"
      title="추천 결과"
      onLeftClick={goToAnalysis}
    />
  );
};

export default RestaurantsNavigation;

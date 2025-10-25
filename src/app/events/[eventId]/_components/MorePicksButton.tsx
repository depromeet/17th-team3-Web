'use client';

import Button from '@/app/_components/ui/Button';
import { cn } from '@/app/_lib/cn';
import { ADDITIONAL_RESTAURANT_COUNT } from '@/app/events/[eventId]/_constants/restaurants';
import { useRestaurantPickCount } from '@/app/events/[eventId]/_hooks/useRestaurantPickCount';

const MorePicksButton = () => {
  const { increasePickCount, canLoadMore } = useRestaurantPickCount();

  return (
    <div className={cn('sticky bottom-0 px-5 py-3', !canLoadMore && 'hidden')}>
      <Button onClick={increasePickCount}>{ADDITIONAL_RESTAURANT_COUNT}개 더 추천받기</Button>
    </div>
  );
};

export default MorePicksButton;

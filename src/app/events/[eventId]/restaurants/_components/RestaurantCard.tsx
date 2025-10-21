'use client';

import { RecommendedPlace } from '@/app/_services/places';
import RestaurantCardContent from '@/app/events/[eventId]/_components/RestaurantCardContent';
import { TOP_RANK } from '@/app/events/[eventId]/restaurants/_constants';

interface RestaurantCardProps {
  restaurant: RecommendedPlace;
  index: number;
}
const RestaurantCard = ({ restaurant, index }: RestaurantCardProps) => {
  const rank = index + TOP_RANK + 1;
  return (
    <div className="flex w-full flex-col gap-2 p-5">
      {rank === TOP_RANK && (
        <div className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-orange-500 label-2 font-semibold text-white">
            {rank}
          </span>
          <span className="label-1 font-semibold text-orange-600">모임원 Pick!</span>
        </div>
      )}

      <RestaurantCardContent theme="lightCompact" place={restaurant} imagePriority={index === 0} />
    </div>
  );
};

export default RestaurantCard;

'use client';

import { useEffect, useRef } from 'react';

import { parseAsInteger, useQueryState } from 'nuqs';

import { RecommendedPlace } from '@/app/_services/places';
import MorePicksButton from '@/app/events/[eventId]/_components/MorePicksButton';
import RestaurantCard from '@/app/events/[eventId]/restaurants/_components/RestaurantCard';
import RestaurantsSwiper from '@/app/events/[eventId]/restaurants/_components/RestaurantSwiper';
import { TOP_RANK } from '@/app/events/[eventId]/restaurants/_constants';

const NAVIGATION_HEIGHT = '3.5rem';

interface RestaurantsProps {
  restaurants: RecommendedPlace[];
}
const RestaurantsClient = ({ restaurants }: RestaurantsProps) => {
  const [picks] = useQueryState('picks', parseAsInteger.withDefault(5));

  const prevPicksRef = useRef(picks);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const prevPicks = prevPicksRef.current;

    if (picks > prevPicks) {
      const newFirstIndex = prevPicks;
      const targetCard = cardRefs.current[newFirstIndex - TOP_RANK];

      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    prevPicksRef.current = picks;
  }, [picks]);

  const top3Restaurants = restaurants.slice(0, TOP_RANK);
  const otherRestaurants = restaurants.slice(TOP_RANK, picks);

  return (
    <div className="flex flex-col">
      <RestaurantsSwiper restaurants={top3Restaurants} />

      <div className="flex flex-col bg-white">
        {otherRestaurants.map((restaurant, index) => (
          <div
            key={restaurant.placeId}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            style={{ scrollMarginTop: NAVIGATION_HEIGHT }}
          >
            <RestaurantCard restaurant={restaurant} index={index} />
          </div>
        ))}

        <MorePicksButton />
      </div>
    </div>
  );
};

export default RestaurantsClient;

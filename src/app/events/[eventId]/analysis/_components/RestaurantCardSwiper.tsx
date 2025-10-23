'use client';
import { useEffect, useRef, useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';
import { ListIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';

import { cn } from '@/app/_lib/cn';
import { RecommendedPlace } from '@/app/_services/places';
import RestaurantCard from '@/app/events/[eventId]/analysis/_components/RestaurantCard';

interface RestaurantCardSwiperProps {
  places: RecommendedPlace[];
}
const RestaurantCardSwiper = ({ places }: RestaurantCardSwiperProps) => {
  const params = useParams();
  const { eventId } = params;

  const [picks] = useQueryState('picks', parseAsInteger.withDefault(5));
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const prevPicksRef = useRef(picks);

  const totalPicks = Math.min(picks, places.length);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    const prevPicks = prevPicksRef.current;
    if (!emblaApi) return;

    if (picks > prevPicks) {
      setTimeout(() => {
        emblaApi.scrollTo(prevPicks);
      }, 500);
    }

    prevPicksRef.current = picks;
  }, [emblaApi, picks]);

  return (
    <div className="flex w-full flex-col gap-5 pt-4 pb-10">
      <div className="flex w-full items-center justify-between px-5">
        <div className="flex gap-2 body-3 font-semibold">
          <span className="text-white">{`${selectedIndex ? selectedIndex + 1 : 1}`}</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-600">{totalPicks}</span>
        </div>
        <Link
          href={`/events/${eventId}/restaurants?picks=${picks}`}
          replace={true}
          prefetch={true}
          className="flex h-8 items-center gap-1 rounded-full border border-white-alpha-3 bg-white-alpha-2 pr-3 pl-2"
        >
          <ListIcon className="h-4 w-4 text-white" />
          <span className="label-2 font-semibold text-white">리스트 보기</span>
        </Link>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="pan-y flex w-full">
          {places.slice(0, picks).map((place, index) => (
            <div
              key={place.placeId}
              className={cn(
                'min ml-1.5 h-[131.7vw] max-h-[623px] flex-[0_0_85%] [transform:translate3d(0,0,0)] overflow-hidden rounded-2xl',
                index === 0 && 'ml-5',
                index === places.length - 1 && 'mr-5'
              )}
            >
              <RestaurantCard place={place} index={index} isActive={selectedIndex === index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCardSwiper;

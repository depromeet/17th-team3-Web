'use client';
import { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import { useParams } from 'next/navigation';

import { cn } from '@/app/_lib/cn';
import { ApiError } from '@/app/_models/api';
import { getOverviewQueryOptions } from '@/app/_queries/overviewQueries';
import { MeetingOverview } from '@/app/_services/overview';
import PersonaCard from '@/app/events/[eventId]/overview/_components/persona/PersonaCard';
import PersonaEmptyCard from '@/app/events/[eventId]/overview/_components/persona/PersonaEmptyCard';

const PersonaCardSwiper = () => {
  const params = useParams();
  const { eventId } = params;

  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data: overview, isPending } = useQuery<MeetingOverview, ApiError>({
    ...getOverviewQueryOptions(Number(eventId)),
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  if (isPending || !overview) return <div>Loading...</div>;

  const hasRemainingSlots =
    overview.participantList.length < overview.meetingInfo.totalParticipantCnt;
  const totalDots = overview.participantList.length + (hasRemainingSlots ? 1 : 0);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-hidden" ref={emblaRef}>
        <div className="flex w-full gap-4 pt-9 pb-6">
          {overview.participantList.map((participant, index) => (
            <div
              key={participant.userId}
              className={cn('flex w-[84%] shrink-0', index === 0 && 'ml-[8%]')}
            >
              <PersonaCard key={participant.userId} participant={participant} />
            </div>
          ))}
          {hasRemainingSlots && <PersonaEmptyCard className="mr-[8%] w-[86%] shrink-0" />}
        </div>
      </div>

      <div className="mb-6 flex flex-row items-center justify-center gap-1">
        {Array.from({ length: totalDots }).map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => scrollTo(index)}
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              selectedIndex === index ? 'bg-orange-600' : 'bg-orange-300'
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonaCardSwiper;

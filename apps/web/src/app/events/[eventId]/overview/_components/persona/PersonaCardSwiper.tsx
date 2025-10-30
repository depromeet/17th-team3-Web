'use client';
import { useCallback, useEffect, useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import { cn } from '@/app/_lib/cn';
import { Overview } from '@/app/_services/overview';
import PersonaCard from '@/app/events/[eventId]/overview/_components/persona/PersonaCard';
import PersonaEmptyCard from '@/app/events/[eventId]/overview/_components/persona/PersonaEmptyCard';

interface PersonaCardSwiperProps {
  overview: Overview;
}

const PersonaCardSwiper = ({ overview }: PersonaCardSwiperProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const hasRemainingSlots = overview.surveys.length < overview.totalAttendees;
  const totalDots = overview.surveys.length + (hasRemainingSlots ? 1 : 0);

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

  return (
    <div className="flex flex-col">
      <div className="overflow-x-hidden" ref={emblaRef}>
        <div className="flex w-full gap-4 pt-9 pb-6">
          {overview.surveys.map((survey, index) => (
            <div
              key={survey.participantId}
              className={cn('flex w-[84%] shrink-0', index === 0 && 'ml-[8%]')}
            >
              <PersonaCard key={survey.participantId} survey={survey} />
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

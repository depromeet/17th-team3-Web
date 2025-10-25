'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
  RefObject,
  ReactNode,
} from 'react';

import { AttendeesData } from '@/app/events/[eventId]/overview/_models/attendee';

const INTERSECTION_OBSERVER_THRESHOLDS = [0.5, 0.6, 0.7];
const SCROLL_ANIMATION_BACKUP_TIMEOUT = 400;

type SnapSyncContextType = {
  attendeesData: AttendeesData;
  activeAttendeeId: string;
  setActiveAttendeeId: (id: string) => void;
  navigateToAttendee: (id: string, smooth?: boolean) => void;

  attendeeAvatarRefs: RefObject<Record<string, HTMLButtonElement | null>>;
  attendeeCardRefs: RefObject<Record<string, HTMLDivElement | null>>;
  cardsContainerRef: RefObject<HTMLDivElement | null>;
};

const SnapSyncContext = createContext<SnapSyncContextType | null>(null);

export const SnapSyncProvider = ({
  attendeesData,
  children,
}: {
  attendeesData: AttendeesData;
  children: ReactNode;
}) => {
  const [activeAttendeeId, setActiveAttendeeId] = useState(attendeesData.attendees[0]?.id ?? '');
  const attendeeAvatarRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const attendeeCardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const isProgrammaticScrolling = useRef(false);

  const navigateToAttendee = useCallback(
    (id: string, smooth = true) => {
      isProgrammaticScrolling.current = true;
      setActiveAttendeeId(id);

      const scrollBehavior: ScrollBehavior = smooth ? 'smooth' : 'auto';

      const targetCardId = id.startsWith('empty-card') ? 'empty-card' : id;
      attendeeCardRefs.current[targetCardId]?.scrollIntoView({
        behavior: scrollBehavior,
        inline: 'center',
        block: 'nearest',
      });
      attendeeAvatarRefs.current[id]?.scrollIntoView({
        behavior: scrollBehavior,
        inline: 'center',
        block: 'nearest',
      });

      scrollTo({
        left: 0,
        top: 0,
        behavior: scrollBehavior,
      });

      // 스크롤 종료 시점에 플래그 해제
      const cardsContainer = cardsContainerRef.current;
      const releaseScrollLock = () => {
        isProgrammaticScrolling.current = false; // Intersection Observer 다시 허용
        cardsContainer?.removeEventListener('scrollend', releaseScrollLock);
      };
      cardsContainer?.addEventListener('scrollend', releaseScrollLock, { once: true });

      // 일부 브라우저를 위한 백업 타임아웃
      window.setTimeout(releaseScrollLock, SCROLL_ANIMATION_BACKUP_TIMEOUT);
    },
    [setActiveAttendeeId]
  );

  useEffect(() => {
    const scrollContainer = cardsContainerRef.current;
    if (!scrollContainer) return;

    const intersectionObserver = new IntersectionObserver(
      (observerEntries) => {
        if (isProgrammaticScrolling.current) return; // 프로그래밍적 스크롤 중이면 무시

        const mostVisibleEntry = observerEntries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

        const cardId = mostVisibleEntry?.target.getAttribute('data-id');
        const normalizedCardId = cardId === 'empty-card' ? 'empty-card-0' : cardId;

        if (normalizedCardId && normalizedCardId !== activeAttendeeId) {
          setActiveAttendeeId(normalizedCardId);

          attendeeAvatarRefs.current[normalizedCardId]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
          });
        }
      },
      { root: scrollContainer, threshold: INTERSECTION_OBSERVER_THRESHOLDS }
    );

    attendeesData.attendees.forEach((attendee) => {
      const cardElement = attendeeCardRefs.current[attendee.id];
      if (cardElement) intersectionObserver.observe(cardElement);
    });

    if (attendeesData.attendees.length < attendeesData.totalAttendees) {
      const emptyCardElement = attendeeCardRefs.current['empty-card'];
      if (emptyCardElement) intersectionObserver.observe(emptyCardElement);
    }

    return () => intersectionObserver.disconnect();
  }, [attendeesData.attendees, attendeesData.totalAttendees, activeAttendeeId, navigateToAttendee]);

  const contextValue: SnapSyncContextType = useMemo(
    () => ({
      attendeesData,
      activeAttendeeId,
      setActiveAttendeeId,
      navigateToAttendee,
      attendeeAvatarRefs,
      attendeeCardRefs,
      cardsContainerRef,
    }),
    [attendeesData, activeAttendeeId, navigateToAttendee]
  );

  return <SnapSyncContext.Provider value={contextValue}>{children}</SnapSyncContext.Provider>;
};

export const useSnapSync = () => {
  const context = useContext(SnapSyncContext);
  if (!context) {
    throw new Error('useSnapSync must be used within SnapSyncProvider');
  }
  return context;
};

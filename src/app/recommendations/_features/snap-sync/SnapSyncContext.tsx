// app/recommendations/_features/snap-sync/SnapSyncContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { AttendeesData } from '@/app/recommendations/_mock/attendee.types';

const INTERSECTION_OBSERVER_THRESHOLDS = [0.5, 0.6, 0.7];
const SCROLL_ANIMATION_BACKUP_TIMEOUT = 400;

/**
 * 참석자 카드와 아바타 스크롤 동기화를 위한 컨텍스트 타입
 */
type SnapSyncContextType = {
  /** 참석자 데이터 */
  attendeesData: AttendeesData;
  /** 현재 활성화된 참석자 ID */
  activeAttendeeId: string;
  /** 활성 참석자 ID 설정 함수 */
  setActiveAttendeeId: (id: string) => void;
  /** 특정 참석자로 네비게이션하는 함수 */
  navigateToAttendee: (id: string, smooth?: boolean) => void;

  /** 참석자 아바타 DOM 참조 */
  attendeeAvatarRefs: React.RefObject<Record<string, HTMLButtonElement | null>>;
  /** 참석자 카드 DOM 참조 */
  attendeeCardRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  /** 카드 래퍼 DOM 참조 */
  cardsContainerRef: React.RefObject<HTMLDivElement | null>;
};

const SnapSyncContext = createContext<SnapSyncContextType | null>(null);

/**
 * 참석자 카드와 아바타 스크롤 동기화를 제공하는 프로바이더
 */
export const SnapSyncProvider = ({
  attendeesData,
  children,
}: {
  attendeesData: AttendeesData;
  children: React.ReactNode;
}) => {
  const [activeAttendeeId, setActiveAttendeeId] = useState(attendeesData.attendees[0]?.id ?? '');
  const attendeeAvatarRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const attendeeCardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const isProgrammaticScrolling = useRef(false); // 프로그래밍적 스크롤 진행 중 여부

  /**
   * 특정 참석자로 스크롤 네비게이션
   * @param id 참석자 ID
   * @param smooth 부드러운 스크롤 여부
   */
  const navigateToAttendee = useCallback(
    (id: string, smooth = true) => {
      isProgrammaticScrolling.current = true; // Intersection Observer 무시 시작
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
    [setActiveAttendeeId] // ref 객체들은 안정적이므로 의존성 배열에 포함하지 않음
  );

  // Intersection Observer를 통한 카드 관찰 및 자동 활성화
  useEffect(() => {
    // 스크롤 컨테이너 DOM이 아직 연결되지 않았다면 관찰을 생략
    const scrollContainer = cardsContainerRef.current;
    if (!scrollContainer) return;

    const intersectionObserver = new IntersectionObserver(
      (observerEntries) => {
        if (isProgrammaticScrolling.current) return; // 프로그래밍적 스크롤 중이면 무시

        // 뷰포트에 들어온 카드 중 가장 많이 노출된 요소 선택
        const mostVisibleEntry = observerEntries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

        // DOM data-id 속성을 통해 참석자 식별자 추출
        const cardId = mostVisibleEntry?.target.getAttribute('data-id');
        const normalizedCardId = cardId === 'empty-card' ? 'empty-card-0' : cardId;

        if (normalizedCardId && normalizedCardId !== activeAttendeeId) {
          // 활성 카드 변경 시에만 상태 업데이트
          setActiveAttendeeId(normalizedCardId);

          // 아바타 스크롤도 동기화하여 두 캐러셀 연동
          attendeeAvatarRefs.current[normalizedCardId]?.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
          });
        }
      },
      { root: scrollContainer, threshold: INTERSECTION_OBSERVER_THRESHOLDS }
    );

    // 모든 참석자 카드 DOM을 관찰 목록에 등록
    attendeesData.attendees.forEach((attendee) => {
      const cardElement = attendeeCardRefs.current[attendee.id];
      if (cardElement) intersectionObserver.observe(cardElement);
    });

    // 빈 카드가 존재하는 경우에도 관찰 대상에 포함
    if (attendeesData.attendees.length < attendeesData.totalAttendees) {
      const emptyCardElement = attendeeCardRefs.current['empty-card'];
      if (emptyCardElement) intersectionObserver.observe(emptyCardElement);
    }

    // 컴포넌트 언마운트 시 관찰 중단하여 메모리 누수 방지
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

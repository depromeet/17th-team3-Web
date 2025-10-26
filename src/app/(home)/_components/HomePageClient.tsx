'use client';

import { useState } from 'react';

import Image from 'next/image';

import {
  ActiveMeetingCard,
  EmptyActiveMeetingCard,
  EndedMeetingCard,
  HomeMenu,
  SectionHeader,
} from '@/app/(home)/_components';
import { useMeetingsByStatus } from '@/app/(home)/_hooks/useMeetingsByStatus';
import { Meeting } from '@/app/(home)/_models/types';
import { cn } from '@/app/_lib/cn';

interface HomePageClientProps {
  meetings: Meeting[];
}

const HomePageClient = ({ meetings }: HomePageClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeMeetings, endedMeetings } = useMeetingsByStatus(meetings);

  const handleProfileClick = () => {
    // TODO: 프로필 페이지로 이동
    setIsMenuOpen(false);
  };

  return (
    <div className="no-scrollbar flex h-[100dvh] flex-col overflow-auto bg-neutral-100">
      <header className="flex items-center justify-between px-5 pt-9 pb-5 select-none">
        <Image src="/images/momuzzi-wordmark.svg" alt="모무찌 작은 로고" width={72} height={26} />
        <button onClick={handleProfileClick} className="cursor-pointer">
          <Image src="/icons/profile.svg" alt="프로필 아이콘" width={32} height={32} />
        </button>
      </header>
      <main>
        {/* 진행 중인 모임 */}
        <section className="py-2">
          <SectionHeader title="진행 중인 모임" icon="/images/avatar/orange.svg" />
          <div
            className={cn(
              'no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-5',
              activeMeetings.length === 1 && 'justify-center'
            )}
          >
            {activeMeetings.length > 0 ? (
              activeMeetings.map((meeting) => (
                <div key={meeting.id} className="min-w-[320px] shrink-0 snap-center">
                  <ActiveMeetingCard
                    meeting={meeting}
                    onClick={() => {
                      // TODO: 모임현황 페이지로 이동
                    }}
                  />
                </div>
              ))
            ) : (
              <EmptyActiveMeetingCard />
            )}
          </div>
        </section>

        {/* 나의 모임 */}
        <section>
          <SectionHeader title="나의 모임" icon="/images/avatar/matcha.svg" />
          <div className="flex flex-col gap-3 px-5 pb-20">
            {endedMeetings.length > 0 ? (
              endedMeetings.map((meeting) => (
                <EndedMeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  onClick={() => {
                    // TODO: 모임결과 페이지로 이동
                  }}
                />
              ))
            ) : (
              <p className="mx-auto px-5 py-[1.25rem] body-3 leading-6 font-medium text-neutral-800">
                이전 모임이 없어요
              </p>
            )}
          </div>
        </section>
      </main>

      <HomeMenu isOpen={isMenuOpen} onToggle={setIsMenuOpen} />
    </div>
  );
};

export default HomePageClient;

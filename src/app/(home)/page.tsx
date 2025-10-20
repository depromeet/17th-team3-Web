'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  ActionButton,
  ActiveMeetingCard,
  EmptyActiveMeetingCard,
  EndedMeetingCard,
  SectionHeader,
} from '@/app/(home)/_components';
import { Meeting } from '@/app/(home)/_models/types';
import FloatingActionButton from '@/app/_components/ui/FloatingActionButton';
import { useToast } from '@/app/_features/toast';
import { meetingsApi } from '@/app/_services/meetings';

const HomePage = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { success: toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    const getMeetings = async () => {
      try {
        const meetings = await meetingsApi.getMeetings();
        setMeetings(meetings);
      } catch (error) {
        console.error('모임 조회 중 에러: ', error);
      }
    };

    getMeetings();
  }, []);

  const handleCreateMeeting = () => {
    router.push('/meetings/create');
    setIsMenuOpen(false);
  };

  const handleComingSoon = () => {
    toast('아직 준비 중인 기능이에요!', { preventDuplicate: true, position: 'top' });
    setIsMenuOpen(false);
  };

  const activeMeetings = meetings.filter((meeting) => !meeting.isClosed);
  const endedMeetings = meetings.filter((meeting) => meeting.isClosed);

  return (
    <div className="no-scrollbar flex h-[100dvh] flex-col overflow-auto bg-neutral-100">
      <header className="flex items-center justify-between px-5 pt-9 pb-5 select-none">
        <Image src="/images/momuzzi-wordmark.svg" alt="모무찌 작은 로고" width={72} height={26} />
        <Image
          src="/icons/profile.svg"
          alt="프로필 아이콘"
          width={32}
          height={32}
          className="cursor-pointer"
        />
      </header>

      <main>
        {/* 진행 중인 모임 */}
        <section className="py-2">
          <SectionHeader title="진행 중인 모임" icon="/images/avatar/orange.svg" />
          <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-5">
            {activeMeetings.length > 0 ? (
              activeMeetings.map((meeting) => (
                <div key={meeting.id} className="min-w-[320px] shrink-0 snap-center">
                  <ActiveMeetingCard meeting={meeting} onClick={() => console.log('1111')} />
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
                  onClick={() => console.log('2222')}
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

      {isMenuOpen && <div className="fixed inset-0 z-9 bg-black/70" aria-hidden="true" />}
      {isMenuOpen && (
        <div className="fixed right-5 bottom-30 z-99 flex flex-col items-end gap-4">
          <ActionButton
            icon="/icons/peoples.svg"
            label="모임 생성하기"
            onClick={handleCreateMeeting}
          />
          <ActionButton
            icon="/icons/green-arrow.svg"
            label="초대받은 모임 참여하기"
            onClick={handleComingSoon}
          />
          <ActionButton
            icon="/icons/arrow.svg"
            label="내 취향으로 추천 받기"
            onClick={handleComingSoon}
          />
        </div>
      )}
      <FloatingActionButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
    </div>
  );
};

export default HomePage;

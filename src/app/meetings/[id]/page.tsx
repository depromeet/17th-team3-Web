'use client';

import { Calendar, ChevronRight, Flame, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import PersonFillIcon from '@/app/_components/icons/PersonFillIcon';
import { Heading } from '@/app/_components/typography';
import Button from '@/app/_components/ui/Button';
import { cn } from '@/app/_lib/cn';

const MeetingPage = () => {
  const router = useRouter();

  return (
    <div className="flex h-[100dvh] flex-col background-2">
      <div className="flex flex-col gap-2 px-8 pt-16 pb-3">
        <Image src={'/images/mumozzi-home-sm.svg'} alt="모무찌 작은 로고" width={36} height={36} />
        <Heading level="h2">우리 어디서 모무찌?</Heading>
      </div>

      <div className="flex-1 px-5 pt-4 pb-9">
        <div
          className="flex h-full shrink-0 flex-col justify-between rounded-[1.25rem] bg-white p-4"
          style={{
            boxShadow: '0 4px 12px 0 rgba(250, 165, 148, 0.50)',
          }}
        >
          <div className="flex flex-col items-center justify-center gap-2 pt-7">
            <div className="flex items-center justify-center gap-2">
              <IconChip
                icon={<Flame className="h-4 w-4 text-orange-500" absoluteStrokeWidth />}
                label={`한국고 동창 모임`}
              />
              <span className="text-neutral-7000 body-3 font-medium">까지</span>
            </div>
            <div className="heading-2 font-bold text-neutral-1200">
              <span className="text-orange-500">10</span>일
              <span className="text-orange-500"> 8</span>
              시간
              <span className="text-orange-500"> 21</span>분
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex w-full flex-col justify-center gap-2 px-4">
              <div className="flex w-full items-center justify-between border-b-1 border-neutral-300 p-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-neutral-500" />
                  <span className="text-gray-500">모이는 날</span>
                </div>
                <span className="label-1 font-semibold text-neutral-1400">2025년 11월 24일</span>
              </div>

              <div className="flex w-full items-center justify-between border-b-1 border-neutral-300 p-2">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-neutral-500" />
                  <span className="text-gray-500">장소</span>
                </div>
                <span className="label-1 font-semibold text-neutral-1400">강남역</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="no-scrollbar no-scrollbar::-webkit-scrollbar flex gap-3 overflow-x-auto pb-2">
              <div className="flex h-[5.625rem] w-18 flex-shrink-0 flex-col items-center justify-center rounded-[0.875rem] bg-blue-600 text-neutral-100">
                <div className="mb-1 text-[32px]">🍣</div>
                <div className="label-1 font-medium">곽두팔</div>
              </div>
              <div className="flex h-[5.625rem] w-18 flex-shrink-0 flex-col items-center justify-center rounded-[0.875rem] bg-red-450 text-neutral-100">
                <div className="mb-1 text-[32px]">🍖</div>
                <div className="text-sm font-medium">한재</div>
              </div>
              <div className="text-gray-1500 flex h-[5.625rem] w-18 flex-shrink-0 flex-col items-center justify-center rounded-[10px] bg-yellow-300">
                <div className="mb-1 text-[32px]">🥩</div>
                <div className="text-sm font-medium">진혁이</div>
              </div>
              <EmptyAttendeeButton />
              <EmptyAttendeeButton />
            </div>

            <Button
              onClick={() => router.push('/survey')}
              className="flex justify-between py-4 pr-2 pl-3"
            >
              <p className="body-2 font-semibold text-white/56">0 / 6</p>
              <div className="flex items-center justify-center gap-1">
                <p>취향 설문 참여 하기</p>
                <ChevronRight size={20} color="#fff" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IconChipProps {
  icon: React.ReactNode;
  label: string;
}

const IconChip = ({ icon, label }: IconChipProps) => {
  return (
    <div className="flex h-7 flex-row items-center gap-0.5 border-b border-neutral-300 pr-2">
      {icon}
      <span className="label-1 font-semibold text-neutral-1400">{label}</span>
    </div>
  );
};

const EmptyAttendeeButton = () => {
  return (
    <div className="flex h-[5.625rem] shrink-0 cursor-pointer flex-col items-center gap-2 transition-all duration-200">
      <div
        className={cn(
          'flex h-[5.625rem] w-18 shrink-0 items-center justify-center gap-2 rounded-[0.875rem] border-0 bg-neutral-200 body-3 font-semibold'
        )}
      >
        <PersonFillIcon className="h-11 w-11 text-neutral-300" />
      </div>
    </div>
  );
};

export default MeetingPage;

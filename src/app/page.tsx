'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

import { meetingsApi } from '@/app/_services/meetings';

interface Meeting {
  id: number;
  name: string;
  hostUserId: number;
  attendeeCount: number;
  isClosed: boolean;
  stationId: number;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}

const MOCK_DATA = [
  {
    id: 1,
    name: '저녁 모무찌',
    hostUserId: 123,
    attendeeCount: 3,
    isClosed: true,
    stationId: 1,
    endAt: '2024-12-31T18:00:00',
    createdAt: '2024-12-25T10:00:00',
    updatedAt: '2024-12-25T15:30:00',
  },
  {
    id: 2,
    name: '저녁 모무찌2',
    hostUserId: 123,
    attendeeCount: 6,
    isClosed: false,
    stationId: 1,
    endAt: '2024-12-31T18:00:00',
    createdAt: '2024-12-25T10:00:00',
    updatedAt: '2024-12-25T15:30:00',
  },
  {
    id: 3,
    name: '저녁 모무찌3',
    hostUserId: 123,
    attendeeCount: 8,
    isClosed: false,
    stationId: 1,
    endAt: '2024-12-31T18:00:00',
    createdAt: '2024-12-25T10:00:00',
    updatedAt: '2024-12-25T15:30:00',
  },
  {
    id: 4,
    name: '저녁 모무찌4',
    hostUserId: 123,
    attendeeCount: 10,
    isClosed: true,
    stationId: 1,
    endAt: '2024-12-31T18:00:00',
    createdAt: '2024-12-25T10:00:00',
    updatedAt: '2024-12-25T15:30:00',
  },
];

const HomePage = () => {
  const createMeeting = async () => {
    const data = await meetingsApi.getMeetings();
  };

  const closedMeetings = MOCK_DATA.filter((meeting) => meeting.isClosed);

  return (
    <div className="flex h-[100dvh] flex-col bg-neutral-100">
      {/* <div className="flex flex-col gap-2 px-8 pt-16 pb-3">
        <Image src={'/images/mumozzi-home-sm.svg'} alt="모무찌 작은 로고" width={36} height={36} />
        <Heading level="h2">우리 어디서 모무찌?</Heading>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Image
          src={'/images/mumozzi-home.svg'}
          alt="모무찌 홈 대표 로고"
          width={101}
          height={101}
        />
        <Text className="text-neutral-1400">아직 진행 중인 식당 추천이 없어요</Text>
      </div>
      <div className="px-5 pt-3 pb-6">
        <Link href="/meetings/create/">
          <Button>새로운 모임 만들고 식당 추천 받기</Button>
        </Link>
      </div> */}
      <div>
        <div className="flex gap-3 p-5">
          <Image
            alt="진행 중인 모임 아이콘"
            src="/images/avatar/orange.svg"
            width={24}
            height={24}
          />
          <h3 className="body-3 leading-6 font-semibold">진행 중인 모임</h3>
          <div></div>
        </div>

        <div>
          <div className="flex gap-3 p-5">
            <Image alt="나의 모임 아이콘" src="/images/avatar/matcha.svg" width={24} height={24} />
            <h3 className="body-3 leading-6 font-semibold">나의 모임</h3>
          </div>

          <div className="flex flex-col gap-3 px-5">
            {closedMeetings.length > 0 ? (
              closedMeetings.map((meeting) => (
                <ClosedMeetingCard key={meeting.id} meeting={meeting} />
              ))
            ) : (
              <p className="mx-auto px-5 py-[1.25rem] body-3 leading-6 font-medium text-neutral-800">
                이전 모임이 없어요
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ClosedMeetingCard = ({ meeting }: { meeting: Meeting }) => {
  const { name, stationId, attendeeCount } = meeting;
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-gray-100 p-4">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <h3 className="subheading-2 font-bold">{name}</h3>
          <ChevronRight size={24} className="text-neutral-800" />
        </div>

        <div className="flex items-center gap-2 label-2 font-medium text-neutral-800">
          {/* todo: stationId -> stationName */}
          <p>{stationId}</p>
          <div className="h-[3px] w-[3px] rounded-full bg-neutral-800" />
          {/* todo: 페칭 -> 포맷팅 */}
          <p>2025.09.03(수) 오후 6:00</p>
        </div>
      </div>

      <div className="flex w-fit items-center justify-center gap-3 rounded-[20px] bg-neutral-100 px-2 py-1">
        <div className="flex">
          {/* todo: 데이터 추가 후, 로직 변경 */}
          <div className="-mr-2 h-5 w-5 rounded-full bg-neutral-100">
            <Image alt="avator" src="/images/avatar/chocolate.svg" width={20} height={20} />
          </div>
          <div className="-mr-2 h-5 w-5 rounded-full bg-neutral-100">
            <Image alt="avator" src="/images/avatar/grape.svg" width={20} height={20} />
          </div>
          <div className="-mr-2 h-5 w-5 rounded-full bg-neutral-100">
            <Image alt="avator" src="/images/avatar/orange.svg" width={20} height={20} />
          </div>
          <div className="-mr-2 h-5 w-5 rounded-full bg-neutral-100">
            <Image alt="avator" src="/images/avatar/milk.svg" width={20} height={20} />
          </div>
        </div>
        <p className="label-2 font-semibold text-orange-800">{`+${attendeeCount}`}</p>
      </div>
    </div>
  );
};

export default HomePage;

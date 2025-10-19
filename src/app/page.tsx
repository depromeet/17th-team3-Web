'use client';

import { CalendarDays, Check, ChevronRight, Clock, MapPin, Plus } from 'lucide-react';
import Image from 'next/image';

import StepIndicator from '@/app/_components/ui/StepIndicator';
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
    isClosed: true,
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
  // const createMeeting = async () => {
  //   const data = await meetingsApi.getMeetings();
  // };

  const activeMeetings = MOCK_DATA.filter((meeting) => !meeting.isClosed);
  const endedMeetings = MOCK_DATA.filter((meeting) => meeting.isClosed);

  return (
    <div className="no-scrollbar flex h-[100dvh] flex-col overflow-auto bg-neutral-100">
      <div className="px-5 pt-9 pb-5">
        <Image src={'/images/momuzzi-wordmark.svg'} alt="모무찌 작은 로고" width={72} height={26} />
        {/* todo: 앱 전환 후, 프로필 아이콘 추가 */}
      </div>

      <div>
        {/* 진행 중인 모잉 */}
        <div className="py-2">
          <div className="flex gap-3 p-5">
            <Image
              alt="진행 중인 모임 아이콘"
              src="/images/avatar/orange.svg"
              width={24}
              height={24}
            />
            <h3 className="body-3 leading-6 font-semibold">진행 중인 모임</h3>
          </div>

          <div className="px-5 pb-5">
            {activeMeetings.length > 0 ? (
              activeMeetings.map((meeting) => {
                const { name, attendeeCount } = meeting;

                return (
                  <div
                    key={meeting.id}
                    className="rounded-3xl border-[1.5px] border-orange-200 p-3 pt-4 background-3"
                  >
                    <div className="flex flex-col gap-3 px-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-1 border-b border-b-neutral-300 pr-2">
                          <Clock size={14} strokeWidth={3} className="text-orange-300" />
                          <p className="label-1 text-[14px] font-medium text-orange-600">
                            1일 00:02:30
                          </p>
                        </div>
                        <ChevronRight size={24} className="text-orange-500" />
                      </div>
                      <div className="flex justify-between">
                        <p className="heading-4 text-xl leading-8 font-bold text-orange-1000">
                          {name}
                        </p>
                        <div className="flex w-fit items-center justify-center gap-3 rounded-[20px] bg-neutral-100 px-2 py-1">
                          <div className="flex">
                            {/* todo: 데이터 추가 후, 로직 변경 */}
                            <div className="-mr-2 h-5 w-5 rounded-full bg-neutral-100">
                              <Image
                                alt="avator"
                                src="/images/avatar/chocolate.svg"
                                width={20}
                                height={20}
                              />
                            </div>
                            <div className="-mr-2 h-5 w-5 rounded-full bg-neutral-100">
                              <Image
                                alt="avator"
                                src="/images/avatar/grape.svg"
                                width={20}
                                height={20}
                              />
                            </div>
                            <div className="-mr-2 h-5 w-5 rounded-full bg-neutral-100">
                              <Image
                                alt="avator"
                                src="/images/avatar/orange.svg"
                                width={20}
                                height={20}
                              />
                            </div>
                            <div className="-mr-2 h-5 w-5 rounded-full bg-neutral-100">
                              <Image
                                alt="avator"
                                src="/images/avatar/milk.svg"
                                width={20}
                                height={20}
                              />
                            </div>
                          </div>
                          <p className="label-2 font-semibold text-orange-800">{`+${attendeeCount}`}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <MapPin size={16} strokeWidth={2.5} className="text-neutral-600" />
                          <p className="label-1 text-[14px] leading-[22px] text-neutral-1000">
                            강남역
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays size={16} strokeWidth={2.5} className="text-neutral-600" />
                          <p className="label-1 text-[14px] leading-[22px] text-neutral-1000">
                            2025.09.03(수) 오후 6:00
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 rounded-3xl bg-white px-4 py-3">
                      <div className="py-2">
                        <StepIndicator total={attendeeCount} value={3} />
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-1">
                          <Check
                            size={16}
                            strokeWidth={3}
                            className="rounded-full bg-orange-400 p-1 text-white"
                          />
                          <div className="text-xm label-2 font-semibold text-orange-600">
                            모임 만들기
                          </div>
                        </div>
                        <div className="text-xm label-2 font-semibold text-neutral-800">
                          식당 추천 시작!
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex w-full flex-col items-center justify-center gap-2 rounded-3xl border-[1.5px] border-orange-200 px-3 py-5 background-3">
                <Image
                  src={'/images/momuzzi-home.svg'}
                  alt="모무찌 홈 대표 로고"
                  width={60}
                  height={60}
                />
                <p className="text-center body-3 leading-6 font-medium whitespace-pre text-neutral-1100">{`아직 진행 중인 식당 추천이 없어요\n모임을 생성하고 식당을 추천받아보세요`}</p>
              </div>
            )}
          </div>
        </div>

        {/* 나의 모잉 */}
        <div>
          <div className="flex gap-3 p-5">
            <Image alt="나의 모임 아이콘" src="/images/avatar/matcha.svg" width={24} height={24} />
            <h3 className="body-3 leading-6 font-semibold">나의 모임</h3>
          </div>

          <div className="flex flex-col gap-3 px-5 pb-20">
            {endedMeetings.length > 0 ? (
              endedMeetings.map((meeting) => (
                <EndeddMeetingCard key={meeting.id} meeting={meeting} />
              ))
            ) : (
              <p className="mx-auto px-5 py-[1.25rem] body-3 leading-6 font-medium text-neutral-800">
                이전 모임이 없어요
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="absolute right-5 bottom-10 flex h-15 w-15 cursor-pointer items-center justify-center rounded-full chip-gradient">
        <Plus size={32} className="text-orange-50" />
      </div>
    </div>
  );
};

const EndeddMeetingCard = ({ meeting }: { meeting: Meeting }) => {
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

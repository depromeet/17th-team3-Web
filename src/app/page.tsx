// 'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Heading, Text } from '@/app/_components/typography';
import Button from '@/app/_components/ui/Button';
import { meetingService } from '@/app/meetings/_services';

const HomePage = async () => {
  // todo: 제거 필요 (상단 'use client' 포함)
  const handleLogout = async () => {
    await fetch(`/api/auth/logout`, {
      method: 'POST',
      // credentials: 'include', -> 동일 Origin이기 때문에 생략해도 문제가 없음 (명시성을 위해 포함시킬지 결정 필요)
    });
  };

  // const createMeeting = async () => {
  // const data = await meetingService.getList(String(123));
  // console.log(data);
  // };

  return (
    <div className="flex h-[100dvh] flex-col background-2">
      <div className="flex flex-col gap-2 px-8 pt-16 pb-3">
        {/* <button onClick={handleLogout}>로그아웃 테스트 버튼</button> */}
        {/* <button onClick={createMeeting}>모임조회 테스트 버튼</button> */}
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
          {/* <Button onClick={createMeeting}>새로운 모임 만들고 식당 추천 받기</Button> */}
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

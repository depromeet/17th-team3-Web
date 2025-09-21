import Image from 'next/image';
import Link from 'next/link';

import Button from '@/app/_components/ui/Button';

const HomePage = () => {
  return (
    <div className="flex h-[100dvh] flex-col bg-[url('/images/mobileBackground.svg')] bg-cover">
      <div className="px-8 pt-16 pb-3">
        <Image src={'/images/mumozzi-home-sm.svg'} alt="모무찌 작은 로고" width={36} height={36} />
        <h1 className="mt-2 bg-gradient-to-r from-orange-900 to-orange-500 bg-clip-text heading-2 font-bold text-transparent">
          우리 어디서 모무찌?
        </h1>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <Image
          src={'/images/mumozzi-home.svg'}
          alt="모무찌 홈 대표 로고"
          width={101}
          height={101}
        />
        <p className="mt-4 body-3 font-medium text-neutral-1400">
          아직 진행 중인 식당 추천이 없어요
        </p>
      </div>
      <div className="px-5 pt-3 pb-6">
        <Button>
          <Link href="/meetings/create/">새로운 모임 만들고 식당 추천 받기</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;

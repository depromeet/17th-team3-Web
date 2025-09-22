'use client';

import Image from 'next/image';

import LoginButton from '@/app/login/_components/LoginButton';

const LoginPage = () => {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center p-4 background-3">
      <main className="mb-10 flex flex-col items-center gap-4">
        <p className="body-2 font-semibold cta-gradient">{`"무조건 맛집? 아니, 나에게 잘 맞는 집!"`}</p>
        <Image src={'/images/momuzzi-wordmark.svg'} alt="모무찌" width={219} height={80} priority />
      </main>

      <LoginButton />
    </div>
  );
};

export default LoginPage;

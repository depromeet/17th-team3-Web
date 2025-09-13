'use client';

import LoginButton from '@/app/login/_components/LoginButton';

const HomePage = () => {
  return (
    <main className="mx-auto flex w-full flex-col items-center justify-center p-4">
      <LoginButton onLogin={() => console.log('로그인!')} />
    </main>
  );
};

export default HomePage;

'use client';

import LoginButton from '@/app/login/_components/LoginButton';

// const OAUTH_URL = process.env.NEXT_PUBLIC_OAUTH_URL!;
const OAUTH_URL = 'https://www.naver.com';

const HomePage = () => {
  const handleLogin = () => {
    window.location.href = OAUTH_URL;
  };

  return (
    <main className="mx-auto flex w-full flex-col items-center justify-center p-4">
      <LoginButton onLogin={handleLogin} />
    </main>
  );
};

export default HomePage;

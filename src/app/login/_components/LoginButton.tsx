'use client';

import Image from 'next/image';

import { cn } from '@/app/_lib/cn';

const REDIRECT_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/auth/callback'
    : 'https://www.momuzzi.site/auth/callback';
const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;

interface LoginButtonProps {
  provider?: 'kakao';
}

const LoginButton = ({ provider = 'kakao' }: LoginButtonProps) => {
  const providerConfig = {
    kakao: {
      text: '카카오톡으로 시작하기',
      icon: '/icons/kakao-icon.svg',
      className: 'bg-yellow-400',
      redirectUrl: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`,
    },
  };

  const config = providerConfig[provider];

  const handleLogin = () => {
    window.location.href = config.redirectUrl;
  };

  return (
    <button
      type="button"
      aria-label={config.text}
      onClick={handleLogin}
      className={cn(
        'flex h-[62px] w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] p-[10px] body-3 font-semibold transition-all duration-200',
        config.className
      )}
    >
      <Image src={config.icon} alt={`${provider} 아이콘`} width={24} height={24} />
      {config.text}
    </button>
  );
};

export default LoginButton;

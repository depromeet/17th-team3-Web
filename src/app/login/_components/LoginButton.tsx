'use client';
import Image from 'next/image';

import { cn } from '@/app/_lib/cn';

interface LoginButtonProps {
  provider?: 'kakao';
}

const LoginButton = ({ provider = 'kakao' }: LoginButtonProps) => {
  const providerConfig = {
    kakao: {
      text: '카카오로 시작하기',
      icon: '/icons/kakao-icon.svg',
      className: 'bg-[#fee500] hover:bg-[#fdd835]',
      // oauthUrl: process.env.NEXT_PUBLIC_KAKAO_OAUTH_URL!,
      oauthUrl: 'auth/callback', // TODO: 배포 후 수정
    },
  };

  const handleLogin = () => {
    window.location.href = config.oauthUrl;
  };

  const config = providerConfig[provider];

  return (
    <button
      onClick={handleLogin}
      className={cn(
        'flex h-[62px] w-full cursor-pointer items-center justify-center gap-3 rounded-[14px] p-[10px] body-3 font-semibold transition-all duration-200',
        config.className
      )}
    >
      <Image src={config.icon} alt={`${provider} 아이콘`} width={18} height={18} />
      {config.text}
    </button>
  );
};

export default LoginButton;

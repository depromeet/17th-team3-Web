'use client';
import Image from 'next/image';

import { cn } from '@/app/_lib/cn';

interface LoginButtonProps {
  provider?: 'kakao';
  onLogin: () => void;
  disabled?: boolean;
}

const LoginButton = ({ provider = 'kakao', onLogin, disabled }: LoginButtonProps) => {
  const providerConfig = {
    kakao: {
      text: '카카오로 시작하기',
      icon: '/icons/kakao-icon.svg',
      className: 'bg-[#fee500] hover:bg-[#fdd835]',
    },
  };

  const config = providerConfig[provider];

  return (
    <button
      onClick={onLogin}
      disabled={disabled}
      className={cn(
        'flex h-[62px] w-full cursor-pointer items-center justify-center gap-3 rounded-[14px] p-[10px] body-3 font-semibold transition-all duration-200',
        config.className,
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <Image src={config.icon} alt={`${provider} 아이콘`} width={18} height={18} />
      {config.text}
    </button>
  );
};

export default LoginButton;

'use client';

import { useState } from 'react';

import Image from 'next/image';

import { HomeMenu } from '@/app/(home)/_components';

interface HomePageLayoutProps {
  children: React.ReactNode;
}

const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProfileClick = () => {
    // TODO: 프로필 페이지로 이동
    setIsMenuOpen(false);
  };

  return (
    <div className="no-scrollbar flex h-[100dvh] flex-col overflow-auto bg-neutral-100">
      <header className="flex items-center justify-between px-5 pt-9 pb-5 select-none">
        <Image src="/images/momuzzi-wordmark.svg" alt="모무찌 작은 로고" width={72} height={26} />
        <button onClick={handleProfileClick} className="cursor-pointer">
          <Image src="/icons/profile.svg" alt="프로필 아이콘" width={32} height={32} />
        </button>
      </header>
      <main>{children}</main>

      <HomeMenu isOpen={isMenuOpen} onToggle={setIsMenuOpen} />
    </div>
  );
};

export default HomePageLayout;

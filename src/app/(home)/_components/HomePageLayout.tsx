'use client';

import { useState } from 'react';

import Image from 'next/image';

import { HomeMenu } from '@/app/(home)/_components';
import { useToast } from '@/app/_features/toast';

interface HomePageLayoutProps {
  children: React.ReactNode;
}

const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { success: toast } = useToast();

  const handleProfileClick = () => {
    toast('아직 준비 중인 기능이에요!', { preventDuplicate: true, position: 'top' });
    setIsMenuOpen(false);
  };

  return (
    <div className="no-scrollbar flex h-[100dvh] flex-col overflow-auto bg-neutral-100">
      <header className="flex items-center justify-between px-5 pt-9 pb-5 select-none">
        <Image
          src="/images/momuzzi-wordmark.svg"
          alt="모무찌 작은 로고"
          width={72}
          height={0}
          style={{ width: 'auto', height: 'auto' }}
        />
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

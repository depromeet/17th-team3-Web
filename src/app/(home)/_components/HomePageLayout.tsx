'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { HomeMenu } from '@/app/(home)/_components';
import { ErrorModal } from '@/app/_components/ui/Modal';
import { getErrorConfig } from '@/app/_constants/errorConfig';
import { useToast } from '@/app/_features/toast';

interface HomePageLayoutProps {
  children: React.ReactNode;
}

const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const { success: toast } = useToast();

  const searchParams = useSearchParams();
  const errorCode = searchParams.get('error');
  const error = errorCode ? getErrorConfig(errorCode) : null;

  useEffect(() => {
    if (error) {
      setIsErrorModalOpen(true);
      window.history.replaceState({}, '', '/');
    }
  }, [error]);

  const handleProfileClick = () => {
    toast('아직 준비 중인 기능이에요!', { preventDuplicate: true, position: 'top' });
    setIsMenuOpen(false);
  };

  return (
    <div className="no-scrollbar flex h-[100dvh] flex-col overflow-auto bg-neutral-100">
      <ErrorModal
        isOpen={isErrorModalOpen}
        title={error?.title ?? ''}
        message={error?.message ?? ''}
        onClose={() => setIsErrorModalOpen(false)}
      />

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

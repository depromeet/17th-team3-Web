'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SplashPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      document.cookie = `splash_seen=true; expires=${expiryDate.toUTCString()}; path=/`;
      router.push('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-[100dvh] items-center justify-center chip-gradient">
      <Image
        src="/images/momuzzi-wordmark-white.svg"
        alt="모무찌 워드마크 아이콘"
        width={140}
        height={52}
      />
    </div>
  );
};

export default SplashPage;

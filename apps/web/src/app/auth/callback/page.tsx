'use client';

import { Suspense, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { exchangeCodeForCookie } from '@/app/_services/auth';
import { useAuthParams } from '@/app/auth/_hooks/useAuthParams';

const CallbackContent = () => {
  const { code, error } = useAuthParams();

  const router = useRouter();

  useEffect(() => {
    const processAuth = async () => {
      if (error) {
        console.error('OAuth 실패:', error);
        router.replace('/login');
        return;
      }

      if (!code) {
        console.error('code 파라미터 없음');
        router.replace('/login');
        return;
      }

      try {
        await exchangeCodeForCookie(code);
        router.replace('/');
      } catch (error) {
        console.error('로그인 실패:', error);
        router.replace('/login');
      }
    };

    processAuth();
  }, [code, error, router]);

  return <div className="mx-auto flex items-center justify-center">로그인 처리중...</div>;
};

const CallbackPage = () => {
  return (
    <Suspense>
      <CallbackContent />
    </Suspense>
  );
};

export default CallbackPage;

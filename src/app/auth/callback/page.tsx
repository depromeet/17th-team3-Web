'use client';

import { Suspense, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@/app/_components/ui/Loading';
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

  return <Loading />;
};

const CallbackPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CallbackContent />
    </Suspense>
  );
};

export default CallbackPage;

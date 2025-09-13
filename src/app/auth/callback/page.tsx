'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthParams } from '@/app/auth/_hooks/useAuthParams';
import { exchangeCodeForCookie } from '@/app/auth/_services/authService';

const CallbackPage = () => {
  const { code, error } = useAuthParams();

  const router = useRouter();

  useEffect(() => {
    const processAuth = async () => {
      if (error) {
        console.error('OAuth 실패:', error);
        router.push('/login');
        return;
      }

      if (!code) {
        router.push('/login');
        return;
      }

      try {
        await exchangeCodeForCookie(code);
        router.push('/');
      } catch (error) {
        console.error('로그인 실패:', error);
        router.push('/login');
      }
    };

    processAuth();
  }, [code, error, router]);

  return <div className="flex items-center justify-center">로그인 처리중..</div>;
};

export default CallbackPage;

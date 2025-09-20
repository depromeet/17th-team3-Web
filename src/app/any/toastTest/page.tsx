'use client';

import Link from 'next/link';

import Button from '@/app/_components/ui/Button';
import { useToast } from '@/app/_features/toast';

const ToastTestPage = () => {
  const { success, error, warning, info, toast, dismissAll } = useToast();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-6">
      <h1 className="mb-4 text-2xl font-bold">Toast 테스트</h1>

      {/* 기본 토스트 */}
      <div className="w-full max-w-sm space-y-3">
        <h2 className="text-lg font-semibold">기본 토스트</h2>
        <Button onClick={() => toast('토스트 메시지', { type: 'success', position: 'top' })}>
          토스트 메시지
        </Button>
        <Button onClick={() => success('성공!')}>Success</Button>
        <Button onClick={() => error('오류 발생!')}>Error</Button>
        <Button onClick={() => warning('주의하세요!')}>Warning</Button>
        <Button onClick={() => info('정보입니다')}>Info</Button>
      </div>

      {/* 옵션 테스트 */}
      <div className="w-full max-w-sm space-y-3">
        <h2 className="text-lg font-semibold">옵션 테스트</h2>

        <Button onClick={() => toast('상단 토스트', { position: 'top' })}>상단 위치</Button>

        <Button onClick={() => success('아이콘 없음', { showIcon: false })}>아이콘 없음</Button>

        <Button onClick={() => warning('중복 방지', { preventDuplicate: true })}>중복 방지</Button>

        <Button onClick={() => info('수동 제거', { duration: 0 })}>수동 제거</Button>
      </div>

      {/* ReactNode 테스트 */}
      <div className="w-full max-w-sm space-y-3">
        <h2 className="text-lg font-semibold">ReactNode 테스트</h2>

        <Button
          onClick={() =>
            success(
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>커스텀 아이콘</span>
              </div>
            )
          }
        >
          커스텀 아이콘
        </Button>

        <Button
          onClick={() =>
            info(
              <div>
                <p>링크가 포함된 메시지</p>
                <Link href="#" className="text-blue-500 underline">
                  클릭하세요
                </Link>
              </div>
            )
          }
        >
          링크 포함
        </Button>
      </div>

      {/* 제어 */}
      <div className="w-full max-w-sm space-y-3">
        <h2 className="text-lg font-semibold">제어</h2>
        <Button onClick={dismissAll} theme="gray">
          모든 토스트 제거
        </Button>
      </div>
    </div>
  );
};

export default ToastTestPage;

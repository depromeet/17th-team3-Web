'use client';

import { useEffect, useState } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import CloseIcon from '@/app/_components/icon/toast/CloseIcon';
import ErrorIcon from '@/app/_components/icon/toast/ErrorIcon';
import InfoIcon from '@/app/_components/icon/toast/InfoIcon';
import SuccessIcon from '@/app/_components/icon/toast/SuccessIcon';
import WarningIcon from '@/app/_components/icon/toast/WarningIcon';
import { cn } from '@/app/_lib/cn';

import type { Toast as ToastType } from '../types';

const toastVariants = cva(
  'pointer-events-auto relative flex w-full items-center justify-between gap-2 overflow-hidden rounded-lg border p-4 shadow-lg transition-all',
  {
    variants: {
      variant: {
        success: 'border-green-200 bg-green-50 text-green-800',
        error: 'border-red-200 bg-red-50 text-red-800',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
        info: 'border-blue-200 bg-blue-50 text-blue-800',
        loading: 'border-gray-200 bg-gray-50 text-gray-800',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

interface ToastProps extends VariantProps<typeof toastVariants> {
  toast: ToastType;
  onClose: (id: string) => void;
}

const Toast = ({ toast, onClose }: ToastProps) => {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 입장 애니메이션
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!toast.showProgress || !toast.duration || toast.duration === 0) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const decrement = 100 / (toast.duration! / 100);
        const next = prev - decrement;
        if (next <= 0) {
          clearInterval(interval);
          return 0;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [toast.duration, toast.showProgress]);

  const handleClose = () => {
    setIsVisible(false);
    const timer = setTimeout(() => onClose(toast.id), 200);
    return () => clearTimeout(timer);
  };

  /**
   * 토스트 스와이프 다운 모바일 친화적
   * 터치 이벤트를 통해 토스트를 스와이프 다운 할 수 있도록 합니다.
   */
  const handleSwipeDown = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const startY = touch.clientY;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const currentTouch = moveEvent.touches[0];
      const diffY = currentTouch.clientY - startY;

      if (diffY > 50) {
        handleClose();
        document.removeEventListener('touchmove', handleTouchMove);
      }
    };

    document.addEventListener('touchmove', handleTouchMove);

    const cleanup = () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };

    setTimeout(cleanup, 300);
  };

  return (
    <div
      className={cn(
        'transform transition-all duration-300 ease-in-out',
        isVisible
          ? toast.position === 'top'
            ? 'translate-y-0 opacity-100'
            : 'translate-y-0 opacity-100'
          : toast.position === 'top'
            ? '-translate-y-full opacity-0'
            : 'translate-y-full opacity-0'
      )}
      onTouchStart={handleSwipeDown}
    >
      <div className={cn(toastVariants({ variant: toast.type }))}>
        {/* 아이콘 영역 */}
        <div className={cn('flex-shrink-0', !toast.showIcon && 'hidden')}>
          {toast.type === 'success' && <SuccessIcon />}
          {toast.type === 'error' && <ErrorIcon />}
          {toast.type === 'warning' && <WarningIcon />}
          {toast.type === 'info' && <InfoIcon />}
        </div>

        {/* 메시지 영역 ReactNode 또는 string */}
        <div className="flex-1">
          {typeof toast.message === 'string' ? (
            <p className="text-sm font-medium">{toast.message}</p>
          ) : (
            toast.message
          )}
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="ml-4 inline-flex flex-shrink-0 justify-center rounded-md text-sm hover:opacity-70 focus:outline-none"
        >
          <CloseIcon />
        </button>

        {/* 진행 바 */}
        {toast.showProgress && toast.duration && toast.duration > 0 && (
          <div className="absolute bottom-0 left-0 h-1 w-full bg-current/20">
            <div
              className="h-full bg-current transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export { Toast };

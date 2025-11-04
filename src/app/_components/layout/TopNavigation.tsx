'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { cn } from '@/app/_lib/cn';

interface TopNavigationProps {
  title?: string;
  showBackButton?: boolean;
  showNextButton?: boolean;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  leftAriaLabel?: string; // 왼쪽 버튼 접근성 라벨
  rightAriaLabel?: string; // 오른쪽 버튼 접근성 라벨
  className?: string;
}

/**
 * 화면 상단 네비게이션 컴포넌트
 *
 * @description 왼쪽/오른쪽 버튼과 타이틀을 포함한 상단 네비게이션 바입니다.
 * 버튼은 onClick 함수 존재 여부에 따라 자동으로 표시/숨김 처리됩니다.
 * 접근성을 위한 aria-label과 keyboard navigation을 지원합니다.
 *
 *
 * ```
 *
 * @param title - 네비게이션 바 중앙에 표시될 제목
 * @param showBackButton - 뒤로가기 버튼 표시 여부 (기본값: false)
 * @param showNextButton - 다음 버튼 표시 여부 (기본값: false)
 * @param onLeftClick - 왼쪽 버튼 클릭 이벤트(기본값: router.back())
 * @param onRightClick - 오른쪽 버튼 클릭 이벤트(기본값: router.forward())
 * @param leftAriaLabel - 왼쪽 버튼의 접근성 라벨 (기본값: "뒤로가기")
 * @param rightAriaLabel - 오른쪽 버튼의 접근성 라벨 (기본값: "메뉴")
 * @param className - 추가 CSS 클래스
 *
 * @note 기본 버튼 텍스트의 색상은 neutral-1200입니다. 필요시 className="text-[color]"로 변경할 수 있습니다.
 *
 * @returns JSX.Element
 */
const TopNavigation = ({
  title,
  showBackButton = false,
  showNextButton = false,
  onLeftClick,
  onRightClick,
  leftAriaLabel = '뒤로가기',
  rightAriaLabel = '다음',
  className,
}: TopNavigationProps) => {
  const router = useRouter();

  const handleLeftClick = () => {
    if (onLeftClick) {
      return onLeftClick();
    }
    return router.back();
  };

  const handleRightClick = () => {
    if (onRightClick) {
      return onRightClick();
    }
    return router.forward();
  };

  return (
    <div
      className={cn(
        'sticky top-0 z-10 flex w-full shrink-0 items-center justify-between bg-inherit p-4 pb-3',
        className
      )}
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center">
        {showBackButton && (
          <button
            type="button"
            onClick={handleLeftClick}
            aria-label={leftAriaLabel}
            className={cn(
              'flex cursor-pointer items-center justify-center bg-transparent text-orange-800',
              className
            )}
          >
            <ChevronLeft size={24} strokeWidth={2} absoluteStrokeWidth />
          </button>
        )}
      </div>

      <span className={cn('body-3 font-semibold text-orange-800', className)}>{title}</span>

      <div className="flex h-6 w-6 shrink-0 items-center justify-center">
        {showNextButton && (
          <button
            type="button"
            onClick={handleRightClick}
            aria-label={rightAriaLabel}
            className={cn(
              'flex cursor-pointer items-center justify-center bg-transparent text-orange-800',
              className
            )}
          >
            <ChevronRight size={24} strokeWidth={2} absoluteStrokeWidth />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopNavigation;

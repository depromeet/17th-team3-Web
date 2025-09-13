import { cn } from '@/app/_lib/cn';

import ChevronIcon from '../icons/ChevronIcon';

interface TopNavigationProps {
  title: string;
  showLeftButton?: boolean;
  showRightButton?: boolean;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  className?: string;
}

/**
 * @description 화면 상단 네비게이션 컴포넌트
 * @param title 타이틀
 * @param showLeftButton 왼쪽 버튼 표시 여부 (기본: true)
 * @param showRightButton 오른쪽 버튼 표시 여부 (기본: false)
 * @param onLeftClick 왼쪽 클릭 이벤트
 * @param onRightClick 오른쪽 클릭 이벤트
 * @description 사용시 padding-top 72px 추가해주세요.
 * @returns
 */
const TopNavigation = ({
  title,
  showLeftButton = true,
  showRightButton = false,
  onLeftClick,
  onRightClick,
  className,
}: TopNavigationProps) => {
  return (
    <div
      className={cn(
        'fixed top-0 z-10 flex w-full max-w-[475px] items-center justify-between gap-2.5 bg-white p-4',
        className
      )}
    >
      <div className="flex h-6 w-6 items-center justify-center">
        {showLeftButton && (
          <ChevronIcon
            direction="left"
            className="h-6 w-6 cursor-pointer text-neutral-1200"
            onClick={onLeftClick}
          />
        )}
      </div>
      <span className="body-3 font-semibold text-neutral-1200">{title}</span>
      <div className="flex h-6 w-6 items-center justify-center">
        {showRightButton && (
          <ChevronIcon
            direction="right"
            className="h-6 w-6 cursor-pointer text-neutral-1200"
            onClick={onRightClick}
          />
        )}
      </div>
    </div>
  );
};

export default TopNavigation;

/**
 * @description TopNavigation과 함께 사용할 수 있는 스페이서 컴포넌트
 * 네비게이션 높이만큼 공간을 확보합니다
 */
export const TopNavigationSpacer = () => <div className="h-[72px]" />;

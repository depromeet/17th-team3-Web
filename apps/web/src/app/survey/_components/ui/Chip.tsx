'use client';

import { Text } from '@/app/_components/typography';
import { cn } from '@/app/_lib/cn';
import { COLORS } from '@/app/survey/_styles/tokens';

type ChipVariant = 'any' | 'cuisine';

export interface ChipProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  orderBadge?: number;
  onClick?: () => void;
  variant?: ChipVariant;
  startIcon?: React.ReactNode;
}

const Chip = ({
  label,
  selected = false,
  disabled = false,
  orderBadge,
  onClick,
  variant = 'cuisine',
  startIcon,
}: ChipProps) => {
  // 고정 width 제거 → 내용에 따라 자동 너비
  // any/cuisine 의 패딩만 다르게
  const padding = variant === 'any' ? 'px-5' : 'px-5';
  const baseH = 'h-12'; // 48px
  const radius = 'rounded-[40px]';

  const common = cn(
    'relative inline-flex select-none items-center justify-center gap-1',
    'whitespace-nowrap', // 아이콘+텍스트 한 줄 유지
    padding,
    baseH,
    'px-5', // start/end = 20px
    'py-3', // top/bottom = 12px
    radius,
    'border',
    disabled ? 'bg-gray-500 cursor-not-allowed opacity-60' : 'cursor-pointer'
  );

  const unselectedCls = cn(common, 'bg-white', 'border-gray-300');
  const selectedCls = cn(common, 'border-transparent text-white');

  const selectedStyle: React.CSSProperties = selected
    ? {
        background: `radial-gradient(120% 120% at 50% 50%, ${COLORS.orange500} 0%, ${COLORS.orange400} 100%)`,
      }
    : {};

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={selected ? selectedCls : unselectedCls}
      style={selectedStyle}
    >
      {/* 선택 순서 배지 */}
      {selected && typeof orderBadge === 'number' && orderBadge > 0 && (
        <span
          className={cn(
            'absolute -top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full border bg-white'
          )}
          style={{ borderColor: COLORS.orange500, color: COLORS.orange500 }}
        >
          <span className="text-[11px] leading-none">{orderBadge}</span>
        </span>
      )}

      <span className="flex items-center gap-1">
        {/* 아이콘: 크기 통일 */}
        {startIcon && <span className="inline-flex h-6 w-6 shrink-0">{startIcon}</span>}
        <Text
          className={cn(
            'body-3 leading-6 font-semibold',
            selected ? 'text-neutral-100' : 'text-neutral-1500'
          )}
        >
          {label}
        </Text>
      </span>
    </button>
  );
};

export default Chip;

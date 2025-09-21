'use client';

import { cn } from '@/app/_lib/cn';
import { COLORS } from '@/app/survey/_styles/tokens';

type ChipVariant = 'any' | 'cuisine';

export interface ChipProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  orderBadge?: number; // 선택 순서(1,2,3…)
  onClick?: () => void;
  variant?: ChipVariant; // any: 118x48, cuisine: 96x48
  startIcon?: React.ReactNode; // 필요 시 SVG
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
  const baseW = variant === 'any' ? 'w-[118px]' : 'w-[96px]';
  const baseH = 'h-12'; // 48px
  const radius = 'rounded-[40px]';

  const common = cn(
    'relative inline-flex select-none items-center justify-center gap-1',
    baseW,
    baseH,
    radius,
    'border',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
  );

  const unselectedCls = cn(
    common,
    'bg-white',
    'border-[#E1E4E8]',
    'px-5' // start=20, end=20
  );

  const selectedCls = cn(common, 'border-transparent text-white', 'px-5');

  // 라디얼 그라데이션 배경 (Orange500 → Orange400)
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
      {/* 순서 배지 */}
      {selected && typeof orderBadge === 'number' && orderBadge > 0 && (
        <span
          className={cn(
            'absolute -top-1',
            'right-1',
            'flex items-center justify-center',
            'h-5 w-5 rounded-full',
            'bg-white',
            'border'
          )}
          style={{ borderColor: COLORS.orange500, color: COLORS.orange500 }}
        >
          <span className="text-[11px] leading-none">{orderBadge}</span>
        </span>
      )}

      <span className="flex items-center gap-1">
        {startIcon && <span className="inline-flex">{startIcon}</span>}
        <span className={cn(selected ? 'text-white' : 'text-black')}>{label}</span>
      </span>
    </button>
  );
};

export default Chip;

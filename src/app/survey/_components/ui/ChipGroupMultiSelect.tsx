'use client';
import { useCallback, useMemo } from 'react';

import Chip from '@/app/survey/_components/ui/Chip';

export interface ChipOption {
  id: string;
  label: string;
  variant?: 'any' | 'cuisine';
  startIcon?: React.ReactNode;
}

export interface ChipGroupMultiSelectProps {
  options: ReadonlyArray<ChipOption>;
  /** 부모가 관리하는 선택값 */
  selectedIds: string[];
  /** 예: ['c:any'] */
  exclusiveIds?: readonly string[];
  /** 토글 시 새로운 배열을 부모에 통지 */
  onChange?: (ids: string[]) => void;
  className?: string;
}

const ChipGroupMultiSelect = ({
  options,
  selectedIds,
  exclusiveIds = [],
  onChange,
  className,
}: ChipGroupMultiSelectProps) => {
  const activeExclusive = useMemo(
    () => selectedIds.find((id) => exclusiveIds.includes(id)),
    [selectedIds, exclusiveIds]
  );

  const toggle = useCallback(
    (id: string) => {
      const has = selectedIds.includes(id);
      const isExclusive = exclusiveIds.includes(id);

      if (has) {
        onChange?.(selectedIds.filter((v) => v !== id));
        return;
      }
      if (isExclusive) {
        onChange?.([id]);
        return;
      }
      const base = activeExclusive ? [] : selectedIds;
      onChange?.([...base, id]);
    },
    [selectedIds, exclusiveIds, activeExclusive, onChange]
  );

  const isDisabled = (id: string) => Boolean(activeExclusive && !exclusiveIds.includes(id));
  const orderOf = (id: string) => {
    const idx = selectedIds.indexOf(id);
    return idx >= 0 ? idx + 1 : 0;
  };

  // ANY 칩만 상단에 단독 렌더링
  const anyChip = options.find((o) => o.variant === 'any');
  const restChips = options.filter((o) => o !== anyChip);

  return (
    <div className={className}>
      {/* ANY 단독 행 */}
      {anyChip && (
        <div className="mb-2 flex">
          <Chip
            key={anyChip.id}
            label={anyChip.label}
            variant="any"
            selected={selectedIds.includes(anyChip.id)}
            disabled={isDisabled(anyChip.id)}
            orderBadge={orderOf(anyChip.id)}
            startIcon={anyChip.startIcon}
            onClick={() => toggle(anyChip.id)}
          />
        </div>
      )}

      {/* 나머지 칩: 내용 너비에 맞춰 wrap */}
      <div className="flex flex-wrap gap-2">
        {restChips.map((o) => (
          <Chip
            key={o.id}
            label={o.label}
            variant={o.variant ?? 'cuisine'}
            selected={selectedIds.includes(o.id)}
            disabled={isDisabled(o.id)}
            orderBadge={orderOf(o.id)}
            startIcon={o.startIcon}
            onClick={() => toggle(o.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChipGroupMultiSelect;

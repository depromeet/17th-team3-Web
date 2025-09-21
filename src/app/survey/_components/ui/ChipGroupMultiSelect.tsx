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
        const next = selectedIds.filter((v) => v !== id);
        onChange?.(next);
        return;
      }

      if (isExclusive) {
        onChange?.([id]); // 배타 옵션 단독
        return;
      }

      // 일반 선택인데 이미 배타가 있으면 초기화 후 추가
      const base = activeExclusive ? [] : selectedIds;
      const next = [...base, id]; // 뒤에 붙여서 선택 순서 유지
      onChange?.(next);
    },
    [selectedIds, exclusiveIds, activeExclusive, onChange]
  );

  const isDisabled = (id: string) => Boolean(activeExclusive && !exclusiveIds.includes(id));
  const orderOf = (id: string) => {
    const idx = selectedIds.indexOf(id);
    return idx >= 0 ? idx + 1 : 0;
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
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

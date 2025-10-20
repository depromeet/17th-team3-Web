'use client';

import { useCallback, useMemo } from 'react';

import Chip from '@/app/survey/_components/ui/Chip';
import { MAX_SELECT_COUNT } from '@/app/survey/_models/constants';

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

      // 1. 이미 선택된 경우 → 제거
      if (has) {
        onChange?.(selectedIds.filter((v) => v !== id));
        return;
      }

      // 2. 배타 옵션 선택 시 → 단독 선택
      if (isExclusive) {
        onChange?.([id]);
        return;
      }

      // 3. 일반 옵션 선택 시, 최대 개수 초과 방지
      const base = activeExclusive ? [] : selectedIds;

      if (base.length >= MAX_SELECT_COUNT) {
        console.warn(`[ChipGroupMultiSelect] 최대 선택 개수(${MAX_SELECT_COUNT})를 초과했습니다.`);
        return; // 선택 무시
      }

      onChange?.([...base, id]);
    },
    [selectedIds, exclusiveIds, activeExclusive, onChange]
  );

  const isDisabled = (id: string) => {
    const isExclusive = exclusiveIds.includes(id);
    // 선택 제한 상태에서 아직 선택되지 않은 칩은 클릭 비활성화
    const maxedOut = selectedIds.length >= MAX_SELECT_COUNT && !selectedIds.includes(id);
    return Boolean((activeExclusive && !isExclusive) || (!isExclusive && maxedOut));
  };

  const orderOf = (id: string) => {
    const option = options.find((o) => o.id === id);
    // "다 괜찮아요" (variant === "any") → 항상 배지 없음
    if (option?.variant === 'any') return 0;
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

      {/* 나머지 칩 */}
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

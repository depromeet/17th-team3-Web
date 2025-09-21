'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/app/_lib/cn';
import ChipGroupMultiSelect, {
  type ChipOption,
} from '@/app/survey/_components/ui/ChipGroupMultiSelect';

const StepChipSelect = ({
  roleLabel,
  title,
  subtitle,
  options,
  defaultSelectedIds = [],
  exclusiveIds = [],
  onBack,
  onNext,
  nextLabel = '다음',
}: {
  roleLabel: string;
  title: string;
  subtitle?: string;
  options: ReadonlyArray<ChipOption>;
  defaultSelectedIds?: string[];
  exclusiveIds?: readonly string[];
  onBack?: () => void;
  onNext: (ids: string[]) => void;
  nextLabel?: string;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);

  // prop → state 동기화 (스텝 왕복 시 복원)
  useEffect(() => {
    setSelectedIds(defaultSelectedIds);
  }, [defaultSelectedIds.join('|')]);

  const nextDisabled = selectedIds.length === 0;

  return (
    <div className="mx-auto max-w-[480px] px-4 py-6 md:py-8">
      <header className="mb-5">
        <div className="text-xs text-gray-500 md:text-sm">{roleLabel} 설문</div>
        <h1 className="mt-1 text-2xl font-bold md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-gray-600 md:text-base">{subtitle}</p>}
      </header>

      <ChipGroupMultiSelect
        options={options}
        selectedIds={selectedIds}
        exclusiveIds={exclusiveIds}
        onChange={(ids) => setSelectedIds(ids)}
      />

      <div className="mt-4 flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
          >
            이전
          </button>
        )}
        <button
          type="button"
          disabled={nextDisabled}
          onClick={() => onNext(selectedIds)}
          className={cn(
            'ml-auto rounded-xl px-4 py-2 text-sm font-medium transition',
            nextDisabled
              ? 'cursor-not-allowed bg-gray-200 text-gray-500'
              : 'bg-black text-white hover:bg-gray-900'
          )}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
};

export default StepChipSelect;

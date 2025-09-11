'use client';

import { useEffect, useMemo, useState, type ReactElement } from 'react';

import clsx from 'clsx';
import { Check } from 'lucide-react';

export type Option = { id: string; label: string };

type Props = {
  title: string;
  subtitle?: string;
  roleLabel: string;
  options: readonly Option[];

  /** 초기 선택 ids */
  defaultSelectedIds?: string[];

  /** '기타' 옵션 id와 기본값(복원용) */
  otherId?: string;
  otherDefault?: string;
  otherPlaceholder?: string;

  onNext: (selectedIds: string[], otherText?: string) => void;
  onBack?: () => void;
  nextLabel?: string;
  disableNextWhenEmpty?: boolean;

  /** 단독(배타) 옵션 ids — 예: ['mood:any'] */
  exclusiveIds?: string[];
};

const StepMultiSelect = (props: Props): ReactElement => {
  const {
    title,
    subtitle,
    roleLabel,
    options,
    defaultSelectedIds = [],
    otherId,
    otherDefault,
    otherPlaceholder = '기타 내용을 입력하세요',
    onNext,
    onBack,
    nextLabel = '다음',
    disableNextWhenEmpty = true,
    exclusiveIds = [],
  } = props;

  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);
  const [otherText, setOtherText] = useState(otherDefault ?? '');

  useEffect(() => setSelectedIds(defaultSelectedIds), [defaultSelectedIds, options]);
  useEffect(() => setOtherText(otherDefault ?? ''), [otherDefault]);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const isEmpty = selectedIds.length === 0;
  const nextDisabled = disableNextWhenEmpty && isEmpty;
  const showOther = !!otherId && selectedSet.has(otherId);

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const has = prev.includes(id);
      const isExclusive = exclusiveIds.includes(id);
      if (has) return prev.filter((v) => v !== id);
      if (isExclusive) return [id];
      const cleared = prev.filter((v) => !exclusiveIds.includes(v));
      return [...cleared, id];
    });
  };

  const handleNext = () => {
    const other = showOther ? otherText.trim() : undefined;
    onNext(selectedIds, other || undefined);
  };

  return (
    <div className="mx-auto max-w-[480px] px-4 py-6 md:py-8">
      <header className="mb-5">
        <div className="text-xs text-gray-500 md:text-sm">{roleLabel} 설문</div>
        <h1 className="mt-1 text-2xl font-bold text-balance break-keep md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-gray-600 md:text-base">{subtitle}</p>}
      </header>

      <ul className="grid grid-cols-1 gap-3">
        {options.map((opt) => {
          const active = selectedSet.has(opt.id);
          return (
            <li key={opt.id} className="list-none">
              <button
                type="button"
                role="checkbox"
                aria-checked={active}
                onClick={() => toggle(opt.id)}
                className={clsx(
                  'w-full rounded-2xl border-2 px-5 py-4 text-left md:px-6 md:py-5',
                  'flex min-h-14 items-center justify-between text-base md:min-h-16 md:text-lg',
                  'shadow-sm transition-colors transition-shadow hover:shadow focus:outline-none',
                  'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                  active
                    ? 'border-blue-600 bg-blue-50/80 text-blue-800 hover:bg-blue-100'
                    : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                )}
              >
                <span className="text-base">{opt.label}</span>
                <span
                  aria-hidden
                  className={clsx(
                    'ml-3 inline-flex items-center rounded-full border px-2 py-0.5 text-xs',
                    active
                      ? 'border-blue-200 bg-blue-100 text-blue-800'
                      : 'border-transparent text-transparent'
                  )}
                >
                  선택됨
                </span>
                {active && (
                  <span
                    aria-hidden
                    className="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow md:h-8 md:w-8"
                  >
                    <Check className="h-4 w-4 md:h-5 md:w-5" strokeWidth={3} />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {showOther && (
        <div className="mt-3">
          <input
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder={otherPlaceholder}
            className="w-full rounded-xl border px-3 py-2 text-sm"
          />
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <span
          className={clsx(
            'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
            isEmpty ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-800'
          )}
        >
          선택 {selectedIds.length}개
        </span>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="ml-2 rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
          >
            이전
          </button>
        )}

        <button
          type="button"
          disabled={nextDisabled}
          onClick={handleNext}
          className={clsx(
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

export default StepMultiSelect;

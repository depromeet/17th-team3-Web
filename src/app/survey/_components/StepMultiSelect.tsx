// src/app/survey/_components/StepMultiSelect.tsx
'use client';

import { useMemo, useState, type ReactElement } from 'react';

import clsx from 'clsx';
import { Check } from 'lucide-react';

type Props<T extends string> = {
  title: string;
  subtitle?: string;
  roleLabel: string;
  options: readonly T[] | T[];
  defaultSelected?: T[];
  onNext: (selected: T[]) => void;
  onBack?: () => void;
  nextLabel?: string;
  disableNextWhenEmpty?: boolean;
};

// ✅ 제네릭 컴포넌트는 함수 "표현식" + 리턴타입 ReactElement
const StepMultiSelect = <T extends string>(props: Props<T>): ReactElement => {
  const {
    title,
    subtitle,
    roleLabel,
    options,
    defaultSelected = [],
    onNext,
    onBack,
    nextLabel = '다음',
    disableNextWhenEmpty = true,
  } = props;

  const [selected, setSelected] = useState<T[]>(defaultSelected);
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const isEmpty = selected.length === 0;
  const nextDisabled = disableNextWhenEmpty && isEmpty;

  const toggle = (opt: T) =>
    setSelected((prev) => (prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt]));

  return (
    <div className="mx-auto max-w-[480px] px-4 py-6 md:py-8">
      <header className="mb-5">
        <div className="text-xs text-gray-500 md:text-sm">{roleLabel} 설문</div>
        <h1 className="mt-1 text-2xl font-bold text-balance break-keep md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-gray-600 md:text-base">{subtitle}</p>}
      </header>

      <ul className="grid grid-cols-1 gap-3">
        {options.map((opt) => {
          const active = selectedSet.has(opt);
          return (
            <li key={opt} className="list-none">
              <button
                type="button"
                role="checkbox"
                aria-checked={active}
                onClick={() => toggle(opt)}
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
                <span className="text-base">{opt}</span>
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

      <div className="mt-4 flex items-center gap-3">
        <span
          className={clsx(
            'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
            isEmpty ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-800'
          )}
        >
          선택 {selected.length}개
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
          onClick={() => onNext(selected)}
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

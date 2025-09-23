'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/app/_lib/cn';

interface StepNameProps {
  defaultName?: string;
  roleLabel: string;
  onNext: (name: string) => void;
}

const StepName = ({ defaultName = '', roleLabel, onNext }: StepNameProps) => {
  const [name, setName] = useState(defaultName);
  const disabled = !name.trim();

  useEffect(() => setName(defaultName), [defaultName]);

  return (
    <div className="mx-auto max-w-[480px] px-4 py-6 md:py-8">
      <header className="mb-5">
        <div className="text-xs text-gray-500 md:text-sm">{roleLabel} 설문</div>
        <h1 className="mt-1 text-2xl font-bold md:text-3xl">이름을 알려주세요</h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">추천 결과에 표시돼요.</p>
      </header>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름 입력"
        className="w-full rounded-xl border px-3 py-2 text-base"
      />

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onNext(name.trim())}
          className={cn(
            'rounded-xl px-4 py-2 text-sm font-medium transition',
            disabled
              ? 'cursor-not-allowed bg-gray-200 text-gray-500'
              : 'bg-black text-white hover:bg-gray-900'
          )}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default StepName;

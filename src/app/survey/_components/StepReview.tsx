'use client';
import { cn } from '@/app/_lib/cn';

import type { Option } from '@/app/survey/_models/option';

/** 리뷰/확인 스텝
 * - 선택 요약을 보여주고, 이전/완료 버튼 제공
 * - 완료 클릭 시 상위 onSubmit() → (분기 or 완료) 로 이동
 */
const StepReview = ({
  roleLabel,
  name,
  prefer,
  dislike,
  onBack,
  onSubmit,
}: {
  roleLabel: string;
  name: string;
  prefer: Option[];
  dislike: Option[];
  onBack: () => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="mx-auto max-w-[480px] px-4 py-6 md:py-8">
      <header className="mb-5">
        <div className="text-xs text-gray-500 md:text-sm">{roleLabel} 설문</div>
        <h1 className="mt-1 text-2xl font-bold md:text-3xl">선택한 결과를 확인해주세요</h1>
      </header>

      <div className="space-y-4">
        <section>
          <h2 className="mb-2 text-sm font-semibold text-gray-700">이름</h2>
          <div className="rounded-xl border px-4 py-3">{name}</div>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-gray-700">선호하는 음식</h2>
          <div className="flex flex-wrap gap-2">
            {prefer.map((o) => (
              <span key={o.id} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                {o.label}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-gray-700">선호하지 않는 음식</h2>
          <div className="flex flex-wrap gap-2">
            {dislike.map((o) => (
              <span key={o.id} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                {o.label}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          이전
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className={cn(
            'ml-auto rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900'
          )}
        >
          설문 완료
        </button>
      </div>
    </div>
  );
};

export default StepReview;

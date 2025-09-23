/** src/app/survey/_components/step/SurveyCuisineStep.tsx */
'use client';

import { useEffect, useMemo, useState } from 'react';

import StepFormLayout from '@/app/meetings/_components/StepFormLayout';
import ChipGroupMultiSelect, {
  type ChipOption,
} from '@/app/survey/_components/ui/ChipGroupMultiSelect';

interface SurveyCuisineStepProps {
  /** 상단 타이틀/설명 */
  title: string;
  description?: string;

  /** 주최자 / 참여자 */
  roleLabel?: string;

  /** 칩 옵션/초기값/배타옵션 */
  options: ReadonlyArray<ChipOption>;
  defaultSelectedIds?: string[];
  exclusiveIds?: readonly string[];

  /** 버튼 핸들러 */
  onNext: (ids: string[]) => void;
  onCancel: () => void;

  /** 버튼 텍스트 (선택) */
  prevButtonText?: string;
  nextButtonText?: string;
}

const SurveyCuisineStep = ({
  title,
  description,
  roleLabel,
  options,
  defaultSelectedIds = [],
  exclusiveIds = [],
  onNext,
  onCancel,
  prevButtonText = '이전',
  nextButtonText = '다음 단계로',
}: SurveyCuisineStepProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);

  // 1) 기본값이 바뀌면 동기화
  useEffect(() => {
    setSelectedIds(defaultSelectedIds);
  }, [defaultSelectedIds.join('|')]);

  // 2) 옵션이 바뀌면, 현재 선택값을 옵션 집합에 맞춰 정리(없는 id 제거)
  const optionIdSet = useMemo(() => new Set(options.map((o) => o.id)), [options]);
  useEffect(() => {
    setSelectedIds((prev) => prev.filter((id) => optionIdSet.has(id)));
  }, [optionIdSet]);

  const isNextDisabled = selectedIds.length === 0;

  return (
    <StepFormLayout
      title={title}
      description={description}
      onCancel={onCancel}
      onNext={() => onNext(selectedIds)}
      isNextDisabled={isNextDisabled}
      prevButtonText={prevButtonText}
      nextButtonText={nextButtonText}
    >
      <ChipGroupMultiSelect
        options={options}
        selectedIds={selectedIds}
        exclusiveIds={exclusiveIds}
        onChange={setSelectedIds}
      />
    </StepFormLayout>
  );
};

export default SurveyCuisineStep;

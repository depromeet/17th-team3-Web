'use client';

import { useState, useMemo } from 'react';

import Image from 'next/image';

import { FOOD_MAP } from '@/app/_constants/menu';
import ChipGroupMultiSelect, {
  type ChipOption,
} from '@/app/survey/_components/ui/ChipGroupMultiSelect';
import FoodConfirmModal from '@/app/survey/_components/ui/FoodConfirmModal';
import StepFormLayout from '@/app/survey/_components/ui/StepFormLayout';
import { MAX_SELECT_COUNT, ANY_ID } from '@/app/survey/_models/constants';
import {
  CUISINE_DETAIL_MAP,
  CUISINE_CATEGORY_LABELS,
  type Option,
} from '@/app/survey/_models/option';

/* -------------------------------------------
 * 음식 → 아이콘 매핑
 * ----------------------------------------- */
const ID_TO_FOOD_KEY: Record<string, keyof typeof FOOD_MAP> = {
  korean: 'korean',
  japanese: 'japanese',
  chinese: 'chinese',
  western: 'western',
  southeast: 'southeast',
};

const LABEL_TO_FOOD_KEY: Record<string, keyof typeof FOOD_MAP> = {
  한식: 'korean',
  중식: 'chinese',
  양식: 'western',
  일식: 'japanese',
  '동남아 음식': 'southeast',
};

/** Option[] → ChipOption[] 변환 */
const toChipOptions = (opts: ReadonlyArray<Option>): ChipOption[] =>
  opts.map((o) => {
    const key = o.id.split(':')[1] as keyof typeof ID_TO_FOOD_KEY;
    const src = FOOD_MAP[ID_TO_FOOD_KEY[key]]?.imageSrc;
    return {
      id: o.id,
      label: o.label,
      variant: 'cuisine',
      startIcon: src ? <Image src={src} alt={o.label} width={20} height={20} /> : null,
    };
  });

interface Props {
  title: string;
  defaultSelectedIds?: string[];
  onNext: (ids: string[]) => void;
  onCancel: () => void;
}

/**
 * SurveyCuisineStepV2
 * - ChipGroupMultiSelect 기반 버전
 * - 칩 배지/우선순위/예외옵션 포함
 * - 선택 후 모달로 한 번 더 확인
 */
const SurveyCuisineStepV2 = ({ title, defaultSelectedIds = [], onNext, onCancel }: Props) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모든 음식 옵션 (CUISINE_DETAIL_MAP 기반)
  const allOptions = useMemo(() => {
    const result: ChipOption[] = [];
    Object.entries(CUISINE_DETAIL_MAP).forEach(([category, foods]) => {
      const chips = toChipOptions(foods);
      result.push(...chips);
    });
    // "다 괜찮아요" 추가 (배타 옵션)
    result.unshift({ id: ANY_ID, label: '다 괜찮아요!', variant: 'any' });
    return result;
  }, []);

  const handleNext = () => {
    if (selectedIds.length === 0) return;
    setIsModalOpen(true);
  };

  const confirmNext = () => {
    setIsModalOpen(false);
    onNext(selectedIds);
  };

  const cancelModal = () => setIsModalOpen(false);

  // 선택한 label 목록
  const selectedLabels = allOptions.filter((o) => selectedIds.includes(o.id)).map((o) => o.label);

  return (
    <>
      <StepFormLayout
        title={title}
        onCancel={onCancel}
        onNext={handleNext}
        isNextDisabled={selectedIds.length === 0}
        nextButtonText="다음으로"
      >
        {/* 카테고리별 그룹 */}
        <div className="flex flex-col gap-6">
          {Object.entries(CUISINE_DETAIL_MAP).map(([category, foods]) => {
            const options = toChipOptions(foods);
            return (
              <div key={category}>
                <h3 className="mb-2 text-lg font-semibold">
                  {CUISINE_CATEGORY_LABELS[category as keyof typeof CUISINE_CATEGORY_LABELS] ??
                    category}
                </h3>
                <ChipGroupMultiSelect
                  options={options}
                  selectedIds={selectedIds}
                  onChange={setSelectedIds}
                  exclusiveIds={[ANY_ID]}
                />
              </div>
            );
          })}
        </div>
      </StepFormLayout>

      {/* 선택 확인 모달 */}
      {isModalOpen && (
        <FoodConfirmModal
          open={isModalOpen}
          title="이대로 저장할까요?"
          subtitle="저장하면 수정할 수 없어요."
          selectedFoods={selectedIds.map((id) => {
            const [, category] = id.split(':');
            const categoryLabel =
              CUISINE_CATEGORY_LABELS[category as keyof typeof CUISINE_CATEGORY_LABELS];
            const iconSrc = FOOD_MAP[category as keyof typeof FOOD_MAP].imageSrc;
            const detailLabel = CUISINE_DETAIL_MAP[
              category as keyof typeof CUISINE_DETAIL_MAP
            ].find((d) => d.id === id)?.label;

            return {
              categoryLabel,
              iconSrc,
              detailLabel: detailLabel ?? '',
            };
          })}
          onCancel={cancelModal}
          onConfirm={confirmNext}
        />
      )}
    </>
  );
};

export default SurveyCuisineStepV2;

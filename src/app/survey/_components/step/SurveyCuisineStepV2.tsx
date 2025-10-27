'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { FOOD_MAP } from '@/app/_constants/menu';
import ChipGroupMultiSelect, {
  type ChipOption,
} from '@/app/survey/_components/ui/ChipGroupMultiSelect';
import FoodConfirmModal from '@/app/survey/_components/ui/FoodConfirmModal';
import LoadingOverlay from '@/app/survey/_components/ui/LoadingOverlay';
import StepFormLayout from '@/app/survey/_components/ui/StepFormLayout';
import { ANY_ID } from '@/app/survey/_models/constants';
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
  const [isLoading, setIsLoading] = useState(false);

  // 알림 콜백
  const handleMaxSelect = () => {
    alert('최대 5개까지 선택이 가능합니다.');
  };

  const handleNext = () => {
    if (selectedIds.length === 0) return;
    setIsModalOpen(true);
  };

  const confirmNext = async () => {
    setIsModalOpen(false);
    setIsLoading(true);

    // 저장 API 호출 & 지연 시뮬레이션
    await new Promise((res) => setTimeout(res, 5000));

    onNext(selectedIds);
    setIsLoading(false);
  };

  return (
    <>
      <StepFormLayout
        title={title}
        onCancel={onCancel}
        onNext={handleNext}
        isNextDisabled={selectedIds.length === 0}
        nextButtonText="다음으로"
        showNotice
      >
        {/* 카테고리별 그룹 */}
        <div className="flex flex-col gap-6">
          {Object.entries(CUISINE_DETAIL_MAP).map(([category, foods]) => {
            const options = toChipOptions(foods);
            const foodMeta = FOOD_MAP[category as keyof typeof FOOD_MAP];

            return (
              <div key={category}>
                {/* 카테고리 타이틀 + 아이콘 */}
                <div className="mb-2 flex items-center gap-2">
                  <Image
                    src={foodMeta.imageSrc}
                    alt={foodMeta.name}
                    width={24}
                    height={24}
                    className="aspect-square"
                  />
                  <h3 className="type-gradient text-lg font-semibold">
                    {CUISINE_CATEGORY_LABELS[category as keyof typeof CUISINE_CATEGORY_LABELS] ??
                      category}
                  </h3>
                </div>

                {/* 칩 그룹 */}
                <ChipGroupMultiSelect
                  options={options}
                  selectedIds={selectedIds}
                  onChange={(ids) => {
                    if (ids.length > 5) {
                      handleMaxSelect();
                      return;
                    }
                    setSelectedIds(ids);
                  }}
                  exclusiveIds={[ANY_ID]}
                />
              </div>
            );
          })}
        </div>
      </StepFormLayout>

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
            return { categoryLabel, iconSrc, detailLabel: detailLabel ?? '' };
          })}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={confirmNext}
        />
      )}

      {isLoading && <LoadingOverlay />}
    </>
  );
};

export default SurveyCuisineStepV2;

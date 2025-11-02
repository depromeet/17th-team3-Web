'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

/**
 * SurveyCuisineStepV2
 * - 사용자가 선호하는 음식을 최대 5개까지 선택하는 단계
 * - 선택 후 FoodConfirmModal로 확인 후 저장
 * - 저장 완료 시 overview 페이지로 이동
 */
const SurveyCuisineStepV2 = ({
  title,
  defaultSelectedIds = [],
  onCancel,
}: {
  title: string;
  defaultSelectedIds?: string[];
  onCancel: () => void;
}) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /** 최대 선택 수 초과 방지 */
  const handleMaxSelect = () => alert('최대 5개까지 선택이 가능합니다.');

  /** 다음 단계 (모달 오픈) */
  const handleNext = () => {
    if (selectedIds.length === 0) return;
    setIsModalOpen(true);
  };

  /** 저장 및 이동 */
  const confirmNext = async () => {
    setIsModalOpen(false);
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 2000));

    const selectedLabels = selectedIds.join(',');
    router.push(`/events/123/overview?selected=${encodeURIComponent(selectedLabels)}`);
  };

  /** Option[] → ChipOption[] 변환 */
  const toChipOptions = (opts: ReadonlyArray<Option>): ChipOption[] =>
    opts.map((o) => {
      const categoryKey = o.id.split(':')[1] as keyof typeof FOOD_MAP;
      const src = FOOD_MAP[categoryKey]?.imageSrc;
      return {
        id: o.id,
        label: o.label,
        variant: 'cuisine',
        startIcon: src ? <Image src={src} alt={o.label} width={20} height={20} /> : null,
      };
    });

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
        {/* 카테고리별 음식 목록 그룹 */}
        <div className="flex flex-col gap-6">
          {Object.entries(CUISINE_DETAIL_MAP).map(([category, foods]) => {
            const options = toChipOptions(foods);
            const foodMeta = FOOD_MAP[category as keyof typeof FOOD_MAP];

            return (
              <div key={category}>
                <div className="mb-2 flex items-center gap-2">
                  <Image
                    src={foodMeta.imageSrc}
                    alt={foodMeta.name}
                    width={24}
                    height={24}
                    className="aspect-square"
                  />
                  <h3 className="type-gradient text-lg font-semibold">
                    {CUISINE_CATEGORY_LABELS[category as keyof typeof CUISINE_CATEGORY_LABELS]}
                  </h3>
                </div>

                <ChipGroupMultiSelect
                  options={options}
                  selectedIds={selectedIds}
                  onChange={(ids) => {
                    if (ids.length > 5) return handleMaxSelect();
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

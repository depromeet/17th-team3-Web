'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { FOOD_MAP } from '@/app/_constants/menu';
import ChipGroupMultiSelect from '@/app/survey/_components/ui/form/ChipGroupMultiSelect';
import StepFormLayout from '@/app/survey/_components/ui/form/StepFormLayout';
import FoodConfirmModal from '@/app/survey/_components/ui/modal/FoodConfirmModal';
import LoadingOverlay from '@/app/survey/_components/ui/modal/LoadingOverlay';
import { useSurveyCategories } from '@/app/survey/_hooks/useSurveyCategories';
import { ANY_ID } from '@/app/survey/_models/constants';

import type { FoodCategory, CommonCtx } from '@/app/survey/_models/types';

interface SurveyCuisineStepProps {
  title: string;
  defaultSelectedIds?: string[];
  onCancel: () => void;
  context: CommonCtx;
  history: any;
}

const SurveyCuisineStep = ({
  title,
  defaultSelectedIds = [],
  onCancel,
  context,
  history,
}: SurveyCuisineStepProps) => {
  const router = useRouter();
  const { categories } = useSurveyCategories();

  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /** Step 다시 들어올 때 context 반영 */
  useEffect(() => {
    setSelectedIds(context.preferCuisineIds || []);
  }, [context.preferCuisineIds]);

  /** 선택 변경 시 즉시 context에 반영 */
  const handleSelectChange = (ids: string[]) => {
    if (ids.length > 5) return alert('최대 5개까지 선택이 가능합니다.');
    setSelectedIds(ids);
    history.replace('PreferCuisine', (prev: CommonCtx) => ({
      ...prev,
      preferCuisineIds: ids,
    }));
  };

  const handleNext = () => {
    if (selectedIds.length === 0) return;
    setIsModalOpen(true);
  };

  const confirmNext = async () => {
    setIsModalOpen(false);
    setIsLoading(true);
    setIsSaving(true);
    await new Promise((res) => setTimeout(res, 1000));
    router.push(`/events/123/overview?selected=${encodeURIComponent(selectedIds.join(','))}`);
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
        <div className="flex flex-col gap-6">
          {categories
            .filter((c) => c.name !== '다 괜찮아요')
            .map((category) => {
              const foodMeta = Object.values(FOOD_MAP).find((m) => m.name === category.name) ?? {
                imageSrc: '/images/menu/default.svg',
                name: category.name,
              };

              return (
                <div key={category.id}>
                  <div className="mb-2 flex items-center gap-2">
                    <Image
                      src={foodMeta.imageSrc}
                      alt={category.name}
                      width={24}
                      height={24}
                      className="aspect-square"
                    />
                    <h3 className="type-gradient text-lg font-semibold">{category.name}</h3>
                  </div>

                  <ChipGroupMultiSelect
                    options={category.children.map((c) => ({
                      id: c.id.toString(),
                      label: c.name,
                      variant: 'cuisine' as const,
                    }))}
                    selectedIds={selectedIds}
                    onChange={handleSelectChange}
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
            // 선택된 음식 (leaf) 찾기
            const found = categories.flatMap((c) => c.children).find((d) => d.id.toString() === id);

            // 해당 leaf가 속한 상위 카테고리 (branch)
            const parent = categories.find((c) =>
              c.children.some((child) => child.id.toString() === id)
            );

            // 카테고리별 이미지 가져오기 (FOOD_MAP 기반)
            const foodMeta = Object.values(FOOD_MAP).find((m) => m.name === parent?.name) ?? {
              imageSrc: '/images/menu/default.svg',
              name: parent?.name ?? '기타',
            };

            // FoodConfirmModal에 넘길 데이터 구성
            return {
              categoryLabel: parent?.name ?? '기타',
              iconSrc: foodMeta.imageSrc, // 카테고리 이미지 매핑
              detailLabel: found?.name ?? '',
            };
          })}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={confirmNext}
        />
      )}

      {(isSaving || isLoading) && <LoadingOverlay />}
    </>
  );
};

export default SurveyCuisineStep;

'use client';

import { useState, useEffect, useMemo } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Loading from '@/app/_components/ui/Loading';
import { getCuisineImageSrc } from '@/app/_constants/cuisine';
import { FOOD_MAP } from '@/app/_constants/menu';
import { surveyApi } from '@/app/_services/survey/api';
import ChipGroupMultiSelect from '@/app/survey/_components/ui/form/ChipGroupMultiSelect';
import StepFormLayout from '@/app/survey/_components/ui/form/StepFormLayout';
import FoodConfirmModal from '@/app/survey/_components/ui/modal/FoodConfirmModal';
import { useSurveyCategories } from '@/app/survey/_hooks/useSurveyCategories';
import { ANY_ID } from '@/app/survey/_models/constants';

import type { FunnelHistory, FoodCategory, CommonCtx } from '@/app/survey/_models/types';

interface SurveyCuisineStepProps {
  title: string;
  defaultSelectedIds?: string[];
  onCancel: () => void;
  context: CommonCtx;
  history: FunnelHistory<CommonCtx>;
  meetingId?: number;
}

const SurveyCuisineStep = ({
  title,
  defaultSelectedIds = [],
  onCancel,
  context,
  history,
  meetingId = 0,
}: SurveyCuisineStepProps) => {
  const router = useRouter();
  const { categories, isLoading: isCategoryLoading } = useSurveyCategories();

  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** context 동기화 */
  useEffect(() => {
    setSelectedIds(context.preferCuisineIds || []);
  }, [context.preferCuisineIds]);

  /** 상위 카테고리 아이콘 src 결정 로직 */
  const resolveCategoryIconSrc = (category: FoodCategory): string => {
    // 1) 이름으로 FOOD_MAP 매칭 시도 (예: '기타 해외 음식')
    const byName = Object.values(FOOD_MAP).find((m) => m.name === category.name);
    if (byName) return byName.imageSrc;

    // 2) 그 외에는 id 기반 CUISINE_MAP 사용
    return getCuisineImageSrc(category.id);
  };

  /** 선택 변경 시 즉시 context 업데이트 */
  const handleSelectChange = (ids: string[]) => {
    if (ids.length > 5) return alert('최대 5개까지 선택이 가능합니다.');
    setSelectedIds(ids);
    history.replace('PreferCuisine', (prev: CommonCtx) => ({
      ...prev,
      preferCuisineIds: ids,
    }));
  };

  /** "다음으로" 버튼 → 확인 모달 오픈 */
  const handleNext = () => {
    if (selectedIds.length === 0) return;
    setIsModalOpen(true);
  };

  /** 설문 저장 API 호출 */
  const confirmNext = async () => {
    if (!meetingId) {
      alert('유효하지 않은 모임 ID입니다.');
      return;
    }

    try {
      setIsModalOpen(false);
      setIsSubmitting(true);

      // Leaf + Branch ID 모두 포함
      const selectedLeafIds = selectedIds.map(Number);
      const branchIds: number[] = [];

      selectedLeafIds.forEach((leafId) => {
        const parent = categories.find((cat) => cat.children.some((child) => child.id === leafId));
        if (parent) branchIds.push(parent.id);
      });

      const categoryIds = Array.from(new Set([...branchIds, ...selectedLeafIds]));
      await surveyApi.postSurveyResult(meetingId, categoryIds);

      router.push(
        `/events/${meetingId}/overview?selected=${encodeURIComponent(selectedIds.join(','))}`
      );
    } catch (error: unknown) {
      const err = error as Error;
      console.error('설문 제출 실패:', err.message);
      alert('설문 제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /** "다 괜찮아요" 제외한 브랜치 카테고리 메모 */
  const displayCategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];
    return categories.filter((c) => c.name !== '다 괜찮아요');
  }, [categories]);

  const isBusy = isCategoryLoading || isSubmitting;

  return (
    <>
      <StepFormLayout
        title={title}
        onCancel={onCancel}
        onNext={handleNext}
        isNextDisabled={selectedIds.length === 0 || isBusy}
        nextButtonText={isSubmitting ? '저장 중...' : '다음으로'}
        showNotice
      >
        {isCategoryLoading ? (
          <div className="py-10 text-center text-sm text-neutral-500">
            음식 목록을 불러오는 중...
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {displayCategories.map((category) => {
              const iconSrc = resolveCategoryIconSrc(category);

              return (
                <div key={category.id}>
                  <div className="mb-2 flex items-center gap-2">
                    <Image
                      src={iconSrc}
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
        )}
      </StepFormLayout>

      {/* 선택 확인 모달 */}
      {isModalOpen && (
        <FoodConfirmModal
          open={isModalOpen}
          title="이대로 저장할까요?"
          subtitle="저장하면 수정할 수 없어요."
          selectedFoods={selectedIds.map((id) => {
            // 선택된 leaf
            const found = categories.flatMap((c) => c.children).find((d) => d.id.toString() === id);
            // 부모 브랜치
            const parent = categories.find((c) =>
              c.children.some((child) => child.id.toString() === id)
            );

            const iconSrc = parent ? resolveCategoryIconSrc(parent) : getCuisineImageSrc(1);

            return {
              categoryLabel: parent?.name ?? '기타',
              iconSrc,
              detailLabel: found?.name ?? '',
            };
          })}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={confirmNext}
        />
      )}

      {/* API 저장 / 카테고리 로딩 중 전체 오버레이 */}
      {isBusy && <Loading />}
    </>
  );
};

export default SurveyCuisineStep;

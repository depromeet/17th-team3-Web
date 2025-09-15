'use client';

import { useSurveyFunnel } from '../_hooks/useSurveyFunnel';
import {
  MOOD_OPTIONS,
  CUISINE_OPTIONS,
  TASTE_OPTIONS,
  AVOID_INGREDIENT_OPTIONS,
  UNWANTED_MENU_OPTIONS,
} from '../_models/option';
import { STEP_KEYS, type RoleLabel, type SurveyResult } from '../_models/types';

import StepMultiSelect from './StepMultiSelect';
import StepProgress from './StepProgress';

export interface SurveyFunnelProps {
  role: RoleLabel;
  initial?: Partial<SurveyResult>;
  onComplete?: (r: SurveyResult) => void;
}

/**
 * SurveyFunnel
 * - 퍼널 오케스트레이션(현재 스텝에 따라 알맞은 UI 렌더링)
 * - useSurveyFunnel의 step/context/history를 사용
 * - 각 스텝:
 *   - defaultSelectedIds/otherDefault 로 진입 시 복원
 *   - history.push(target, prev => ({ ...prev, ... })) 로 다음 스텝 이동
 *   - history.replace(target, prev => prev) 로 이전 스텝 복귀(상태 보존)
 */
const SurveyFunnel = ({ role, initial, onComplete }: SurveyFunnelProps) => {
  const { step, context, history } = useSurveyFunnel(initial);

  // 진행률 계산(현재 스텝 1-index 기준)
  const currentIndex = STEP_KEYS.indexOf(step);
  const total = STEP_KEYS.length;

  if (step === 'Mood') {
    return (
      <>
        <StepProgress total={total} active={currentIndex} className="mb-2" />
        <StepMultiSelect
          key="Mood"
          roleLabel={role}
          title="이번 모임, 어떤 분위기면 좋을까요?"
          options={MOOD_OPTIONS}
          defaultSelectedIds={context.moodsIds}
          exclusiveIds={['mood:any']}
          otherId="mood:other"
          otherDefault={context.others.Mood}
          onNext={(moodsIds, other) =>
            history.push('Cuisine', (prev) => ({
              ...prev,
              moodsIds,
              others: { ...prev.others, Mood: other },
            }))
          }
        />
      </>
    );
  }

  if (step === 'Cuisine') {
    return (
      <>
        <StepProgress total={total} active={currentIndex} className="mb-2" />
        <StepMultiSelect
          key="Cuisine"
          roleLabel={role}
          title="어떤 종류의 음식을 선호하시나요?"
          options={CUISINE_OPTIONS}
          defaultSelectedIds={context.cuisinesIds}
          exclusiveIds={['cuisine:any']}
          otherId="cuisine:other"
          otherDefault={context.others.Cuisine}
          onBack={() => history.replace('Mood', (prev) => prev)}
          onNext={(cuisinesIds, other) =>
            history.push('Taste', (prev) => ({
              ...prev,
              cuisinesIds,
              others: { ...prev.others, Cuisine: other },
            }))
          }
        />
      </>
    );
  }

  if (step === 'Taste') {
    return (
      <>
        <StepProgress total={total} active={currentIndex} className="mb-2" />
        <StepMultiSelect
          key="Taste"
          roleLabel={role}
          title="이번 모임에서 어떤 맛을 즐기고 싶으세요?"
          options={TASTE_OPTIONS}
          defaultSelectedIds={context.tastesIds}
          exclusiveIds={['taste:any']}
          otherId="taste:other"
          otherDefault={context.others.Taste}
          onBack={() => history.replace('Cuisine', (prev) => prev)}
          onNext={(tastesIds, other) =>
            history.push('AvoidIngredient', (prev) => ({
              ...prev,
              tastesIds,
              others: { ...prev.others, Taste: other },
            }))
          }
        />
      </>
    );
  }

  if (step === 'AvoidIngredient') {
    return (
      <>
        <StepProgress total={total} active={currentIndex} className="mb-2" />
        <StepMultiSelect
          key="AvoidIngredient"
          roleLabel={role}
          title="혹시 피해야 하는 재료가 있나요?"
          options={AVOID_INGREDIENT_OPTIONS}
          defaultSelectedIds={context.avoidIngredientsIds}
          exclusiveIds={['avoid:any']}
          otherId="avoid:other"
          otherDefault={context.others.AvoidIngredient}
          onBack={() => history.replace('Taste', (prev) => prev)}
          onNext={(avoidIngredientsIds, other) =>
            history.push('UnwantedMenu', (prev) => ({
              ...prev,
              avoidIngredientsIds,
              others: { ...prev.others, AvoidIngredient: other },
            }))
          }
        />
      </>
    );
  }

  return (
    <>
      <StepProgress total={total} active={currentIndex} className="mb-2" />
      <StepMultiSelect
        key="UnwantedMenu"
        roleLabel={role}
        title="이번 모임에서 원하지 않는 메뉴가 있나요?"
        options={UNWANTED_MENU_OPTIONS}
        defaultSelectedIds={context.unwantedMenusIds}
        nextLabel="완료"
        exclusiveIds={['unwanted:any']}
        otherId="unwanted:other"
        otherDefault={context.others.UnwantedMenu}
        onBack={() => history.replace('AvoidIngredient', (prev) => prev)}
        onNext={(unwantedMenusIds, other) => {
          const result: SurveyResult = {
            ...context,
            unwantedMenusIds,
            others: { ...context.others, UnwantedMenu: other },
          };
          onComplete?.(result);
        }}
      />
    </>
  );
};

export default SurveyFunnel;

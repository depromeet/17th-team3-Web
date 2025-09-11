'use client';

import type { FC } from 'react';

import { useSurveyFunnel } from '../_hooks/useSurveyFunnel';
import {
  MOOD_OPTIONS,
  CUISINE_OPTIONS,
  TASTE_OPTIONS,
  AVOID_INGREDIENT_OPTIONS,
  UNWANTED_MENU_OPTIONS,
} from '../_models/option'; // ← 파일명 통일
import { STEP_KEYS, type CommonCtx, type RoleLabel, type SurveyResult } from '../_models/types';

import StepMultiSelect from './StepMultiSelect';
import StepProgress from './StepProgress';

type Props = {
  role: RoleLabel;
  initial?: Partial<SurveyResult>;
  onComplete?: (r: SurveyResult) => void;
};

const SurveyFunnel: FC<Props> = ({ role, initial, onComplete }) => {
  const { step, context, history } = useSurveyFunnel(initial);

  const currentIndex = STEP_KEYS.indexOf(step);
  const percent = Math.round(((currentIndex + 1) / STEP_KEYS.length) * 100);

  if (step === 'Mood') {
    return (
      <>
        <StepProgress value={percent} />
        <StepMultiSelect
          key="Mood"
          roleLabel={role}
          title="이번 모임, 어떤 분위기면 좋을까요?"
          options={MOOD_OPTIONS}
          defaultSelected={context.moods}
          exclusiveIds={['mood:any']}
          otherId="mood:other"
          onNext={(moods) => history.push('Cuisine', (prev: CommonCtx) => ({ ...prev, moods }))}
        />
      </>
    );
  }

  if (step === 'Cuisine') {
    return (
      <>
        <StepProgress value={percent} />
        <StepMultiSelect
          key="Cuisine"
          roleLabel={role}
          title="어떤 종류의 음식을 선호하시나요?"
          options={CUISINE_OPTIONS}
          defaultSelected={context.cuisines}
          exclusiveIds={['cuisine:any']}
          otherId="cuisine:other"
          onBack={() => history.back()}
          onNext={(cuisines) => history.push('Taste', (prev) => ({ ...prev, cuisines }))}
        />
      </>
    );
  }

  if (step === 'Taste') {
    return (
      <>
        <StepProgress value={percent} />
        <StepMultiSelect
          key="Taste"
          roleLabel={role}
          title="이번 모임에서 어떤 맛을 즐기고 싶으세요?"
          options={TASTE_OPTIONS}
          defaultSelected={context.tastes}
          exclusiveIds={['taste:any']}
          otherId="taste:other"
          onBack={() => history.back()}
          onNext={(tastes) => history.push('AvoidIngredient', (prev) => ({ ...prev, tastes }))}
        />
      </>
    );
  }

  if (step === 'AvoidIngredient') {
    return (
      <>
        <StepProgress value={percent} />
        <StepMultiSelect
          key="AvoidIngredient"
          roleLabel={role}
          title="혹시 피해야 하는 재료가 있나요?"
          options={AVOID_INGREDIENT_OPTIONS}
          defaultSelected={context.avoidIngredients}
          exclusiveIds={['avoid:any']}
          otherId="avoid:other"
          onBack={() => history.back()}
          onNext={(avoidIngredients) =>
            history.push('UnwantedMenu', (prev) => ({ ...prev, avoidIngredients }))
          }
        />
      </>
    );
  }

  return (
    <>
      <StepProgress value={percent} />
      <StepMultiSelect
        key="UnwantedMenu"
        roleLabel={role}
        title="이번 모임에서 원하지 않는 메뉴가 있나요?"
        options={UNWANTED_MENU_OPTIONS}
        defaultSelected={context.unwantedMenus}
        nextLabel="완료"
        exclusiveIds={['unwanted:any']}
        otherId="unwanted:other"
        onBack={() => history.back()}
        onNext={(unwantedMenus) => {
          const result: SurveyResult = { ...context, unwantedMenus };
          onComplete?.(result);
        }}
      />
    </>
  );
};

export default SurveyFunnel;

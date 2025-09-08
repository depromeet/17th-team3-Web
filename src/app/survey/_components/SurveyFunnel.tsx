// src/app/survey/_components/SurveyFunnel.tsx
'use client';

import type { FC } from 'react';

import { useSurveyFunnel } from '../_hooks/useSurveyFunnel';
import {
  MOOD_OPTIONS,
  CUISINE_OPTIONS,
  TASTE_OPTIONS,
  AVOID_INGREDIENT_OPTIONS,
  UNWANTED_MENU_OPTIONS,
} from '../_models/options';
import { STEP_KEYS, type CommonCtx, RoleLabel, SurveyResult } from '../_models/types';

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
          roleLabel={role}
          title="이번 모임, 어떤 분위기면 좋을까요?"
          options={MOOD_OPTIONS}
          defaultSelected={context.moods}
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
          roleLabel={role}
          title="어떤 종류의 음식을 선호하시나요?"
          options={CUISINE_OPTIONS}
          defaultSelected={context.cuisines}
          onBack={() => history.back()}
          onNext={(cuisines) => history.push('Taste', (prev: CommonCtx) => ({ ...prev, cuisines }))}
        />
      </>
    );
  }

  if (step === 'Taste') {
    return (
      <>
        <StepProgress value={percent} />
        <StepMultiSelect
          roleLabel={role}
          title="이번 모임에서 어떤 맛을 즐기고 싶으세요?"
          options={TASTE_OPTIONS}
          defaultSelected={context.tastes}
          onBack={() => history.back()}
          onNext={(tastes) =>
            history.push('AvoidIngredient', (prev: CommonCtx) => ({ ...prev, tastes }))
          }
        />
      </>
    );
  }

  if (step === 'AvoidIngredient') {
    return (
      <>
        <StepProgress value={percent} />
        <StepMultiSelect
          roleLabel={role}
          title="혹시 피해야 하는 재료가 있나요?"
          options={AVOID_INGREDIENT_OPTIONS}
          defaultSelected={context.avoidIngredients}
          onBack={() => history.back()}
          onNext={(avoidIngredients) =>
            history.push('UnwantedMenu', (prev: CommonCtx) => ({ ...prev, avoidIngredients }))
          }
        />
      </>
    );
  }

  return (
    <>
      <StepProgress value={percent} />
      <StepMultiSelect
        roleLabel={role}
        title="이번 모임에서 원하지 않는 메뉴가 있나요?"
        options={UNWANTED_MENU_OPTIONS}
        defaultSelected={context.unwantedMenus}
        nextLabel="완료"
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

'use client';

import { FOOD_MAP } from '@/app/_constants/menu';
import { cn } from '@/app/_lib/cn';
import KoreanFollowUpStep from '@/app/survey/_components/step/KoreanFollowUpStep';
import SurveyCuisineStep from '@/app/survey/_components/step/SurveyCuisineStep';
import SurveyNameStep from '@/app/survey/_components/step/SurveyNameStep';
import SurveyReviewStep from '@/app/survey/_components/step/SurveyReviewStep';
import StepChipSelect from '@/app/survey/_components/StepChipSelect';
import StepName from '@/app/survey/_components/StepName';
import StepReview from '@/app/survey/_components/StepReview';
import SurveyLayout from '@/app/survey/_components/SurveyLayout';
import { useSurveyFunnel } from '@/app/survey/_hooks/useSurveyFunnel';
import { SURVEY_TOTAL_STEPS, stepKeyToIndex, getPrevStepKey } from '@/app/survey/_models/constants';
import { CUISINE_OPTIONS, type Option } from '@/app/survey/_models/option';
import { type RoleLabel, type SurveyResult, type StepKey } from '@/app/survey/_models/types';
import { ANY_ID } from '@/app/survey/_styles/tokens';

import type { ChipOption } from '@/app/survey/_components/ui/ChipGroupMultiSelect';

// CUISINE id → FOOD_MAP key 매핑
const ID_TO_FOOD_KEY: Record<string, keyof typeof FOOD_MAP> = {
  'c:korean': 'korean',
  'c:japanese': 'japanese',
  'c:chinese': 'chinese',
  'c:western': 'western',
  'c:vietnamese': 'vietnamese',
  'c:mexican': 'mexican',
  'c:indian': 'indian',
  'c:thai': 'thai',
  'c:school': 'bunsik',
};

// Option[] → ChipOption[] (startIcon 주입)
const toChipOptions = (opts: ReadonlyArray<Option>): ChipOption[] =>
  opts.map((o) => {
    if (o.id === ANY_ID) {
      return {
        id: o.id,
        label: o.label,
        variant: 'any' as const,
        startIcon: null, // '다 괜찮아요'는 아이콘 없이
      };
    }

    const key = ID_TO_FOOD_KEY[o.id];
    const src = key ? FOOD_MAP[key].imageSrc : undefined;

    return {
      id: o.id,
      label: o.label,
      variant: 'cuisine' as const,
      startIcon: src ? (
        // Next <Image>를 써도 되지만, SVG는 img가 간편
        <img src={src} alt={o.label} width={20} height={20} />
      ) : null,
    };
  });

// 리뷰용 원본 옵션 추출
const pickOptions = (ids: string[], all: ReadonlyArray<Option>) =>
  all.filter((o) => ids.includes(o.id));

export interface SurveyFunnelProps {
  role: RoleLabel;
  initial?: Partial<SurveyResult>;
  onComplete?: (r: SurveyResult) => void;
}

/** SurveyFunnel (퍼널 오케스트레이터)
 * - step/context/history를 기반으로 현재 스텝에 맞는 화면을 렌더링
 * - '다 괜찮아요!'(c:any)는 배타 옵션 → 단독 선택
 * - 비선호 단계의 후보는 '선호에서 선택한 항목'을 제외하고 렌더
 * - 단계별 key 부여로 state 분리(배지 번호가 각 스텝에서 1부터 시작)
 */
const SurveyFunnel = ({ role, initial, onComplete }: SurveyFunnelProps) => {
  const { step, context, history } = useSurveyFunnel({ ...initial, role });

  const stepValue = stepKeyToIndex(step); // 1-base

  const handleBack = () => {
    if (step === 'Name') {
      // 첫 스텝: 라우터 기본 뒤로가기 UX를 쓰고 싶으면 TopNavigation 디폴트에 맡겨도 됨.
      // 퍼널 내부만 이동하려면 아래처럼 이전 스텝 계산을 skip 하거나 별도 처리.
      history.replace('Name', (p) => p);
      return;
    }
    const prev = getPrevStepKey(step);
    history.replace(prev, (p) => p);
  };

  // 1) 이름
  if (step === 'Name') {
    return (
      <SurveyLayout stepValue={stepValue} totalSteps={SURVEY_TOTAL_STEPS} onBack={handleBack}>
        <SurveyNameStep
          initialValue={context.name}
          onCancel={handleBack}
          onNext={(name) => history.push('PreferCuisine', (prev) => ({ ...prev, name }))}
        />
        {/*<StepName*/}
        {/*  roleLabel={context.role}*/}
        {/*  defaultName={context.name}*/}
        {/*  onNext={(name) => history.push('PreferCuisine', (prev) => ({ ...prev, name }))}*/}
        {/*/>*/}
      </SurveyLayout>
    );
  }

  // 2) 선호
  if (step === 'PreferCuisine') {
    const options: ChipOption[] = toChipOptions(CUISINE_OPTIONS);
    return (
      <SurveyLayout stepValue={stepValue} totalSteps={SURVEY_TOTAL_STEPS} onBack={handleBack}>
        <SurveyCuisineStep
          key="PreferCuisine"
          title={`어떤 종류의 음식을\n선호하시나요?`}
          roleLabel={context.role}
          options={options}
          defaultSelectedIds={context.preferCuisineIds}
          exclusiveIds={[ANY_ID]}
          onCancel={handleBack}
          onNext={(preferCuisineIds) => {
            const nextIds = preferCuisineIds.includes(ANY_ID) ? [ANY_ID] : preferCuisineIds;
            history.push('DislikeCuisine', (prev) => ({ ...prev, preferCuisineIds: nextIds }));
          }}
        />
      </SurveyLayout>
    );
  }

  // 3) 비선호
  if (step === 'DislikeCuisine') {
    // '선호'에서 ANY를 골랐다면 '모두 허용' 의미 → '비선호' 후보는 전체(ANY 포함)
    const excluded = context.preferCuisineIds.includes(ANY_ID) ? [] : context.preferCuisineIds;
    const base = CUISINE_OPTIONS;

    /**
     * ToDo
     * - if -> switch 문 변경 시 적용 (불필요한 렌더 줄이기)
     * */
    // const dislikeOptions = useMemo(() => {
    //   const excluded = context.preferCuisineIds.includes(ANY_ID) ? [] : context.preferCuisineIds;
    //   const list: Option[] = [
    //     CUISINE_OPTIONS.find(o => o.id === ANY_ID)!,
    //     ...CUISINE_OPTIONS.filter(o => o.id !== ANY_ID && !excluded.includes(o.id)),
    //   ];
    //   return toChipOptions(list);
    // }, [context.preferCuisineIds]);

    // ANY는 항상 맨 앞에 노출, 나머지는 선호 제외 필터링
    const dislikeCandidates: Option[] = [
      base.find((o) => o.id === ANY_ID)!, // non-null 단언(테이블 상 항상 존재)
      ...base.filter((o) => o.id !== ANY_ID && !excluded.includes(o.id)),
    ];
    const options: ChipOption[] = toChipOptions(dislikeCandidates);

    return (
      <SurveyLayout stepValue={stepValue} totalSteps={SURVEY_TOTAL_STEPS} onBack={handleBack}>
        <SurveyCuisineStep
          key="PreferCuisine"
          title={`혹시 피하는 종류의 음식이\n있나요?`}
          roleLabel={context.role}
          options={options}
          defaultSelectedIds={context.dislikeCuisineIds}
          exclusiveIds={[ANY_ID]}
          onCancel={handleBack}
          onNext={(dislikeCuisineIds) => {
            history.push('Review', (prev) => ({ ...prev, dislikeCuisineIds }));
          }}
        />
      </SurveyLayout>
    );
  }

  // 4) 리뷰
  if (step === 'Review') {
    const prefer = pickOptions(context.preferCuisineIds, CUISINE_OPTIONS);
    const dislike = pickOptions(context.dislikeCuisineIds, CUISINE_OPTIONS);

    console.log(context);
    return (
      <SurveyLayout
        stepValue={stepValue}
        totalSteps={SURVEY_TOTAL_STEPS}
        onBack={handleBack}
        title="설문 검토"
        className="background-2"
      >
        <SurveyReviewStep
          roleLabel={context.role}
          name={context.name}
          prefer={prefer}
          dislike={dislike}
          onCancel={handleBack}
          onSubmit={() => {
            const enableBranch = context.hostFlags?.enableCuisineBranch;
            const hasKorean = context.preferCuisineIds.includes('c:korean');
            if (enableBranch && hasKorean) {
              history.push('KoreanFollowUp', (p) => p);
              return;
            }
            const result: SurveyResult = { ...context };
            onComplete?.(result);
            history.push('Complete', (p) => p);
          }}
          nextButtonText="저장하기"
          prevButtonText="이전"
        />
      </SurveyLayout>
    );
  }

  // 5) (옵션) 한식 분기
  if (step === 'KoreanFollowUp') {
    return (
      <SurveyLayout
        stepValue={stepValue}
        totalSteps={SURVEY_TOTAL_STEPS}
        onBack={() => history.replace('Review', (p) => p)}
        title="한식 추가 설문"
      >
        <KoreanFollowUpStep
          onCancel={() => history.replace('Review', (p) => p)}
          onNext={() => {
            const result: SurveyResult = { ...context };
            onComplete?.(result);
            history.push('Complete', (p) => p);
          }}
        />
      </SurveyLayout>
    );
  }

  // 완료
  return (
    <SurveyLayout
      stepValue={stepValue}
      totalSteps={SURVEY_TOTAL_STEPS}
      onBack={handleBack}
      title="설문 완료"
    >
      <div className="mx-auto max-w-[480px] px-4 py-12 text-center">
        <h1 className="text-2xl font-bold md:text-3xl">설문이 완료되었습니다 🎉</h1>
        <p className="mt-3 text-gray-600">추천 결과를 준비 중이에요.</p>
      </div>
    </SurveyLayout>
  );
};

export default SurveyFunnel;

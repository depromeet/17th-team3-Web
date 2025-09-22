'use client';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import StepChipSelect from '@/app/survey/_components/StepChipSelect';
import StepName from '@/app/survey/_components/StepName';
import StepProgress from '@/app/survey/_components/StepProgress';
import StepReview from '@/app/survey/_components/StepReview';

import { useSurveyFunnel } from '../_hooks/useSurveyFunnel';
import { CUISINE_OPTIONS, type Option } from '../_models/option';
import { STEP_KEYS, type RoleLabel, type SurveyResult } from '../_models/types';
import { ANY_ID } from '../_styles/tokens';

import type { ChipOption } from '@/app/survey/_components/ui/ChipGroupMultiSelect';

// Option[] → 칩 옵션으로 변환 (variant는 리터럴 타입으로 고정)
const toChipOptions = (opts: ReadonlyArray<Option>): ChipOption[] =>
  opts.map((o) => ({
    id: o.id,
    label: o.label,
    variant: o.id === ANY_ID ? ('any' as const) : ('cuisine' as const),
  }));

// id 배열로 선택한 Option 원본 레코드 추출(리뷰 화면용)
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
  // useFunnel: 현재 스텝(step), 전역문맥(context), 전환(history)
  const { step, context, history } = useSurveyFunnel({ ...initial, role });

  // 진행바 계산
  const currentIndex = STEP_KEYS.indexOf(step);
  const total = 5; // Name / Prefer / Dislike / Review / Complete

  // ---- Flow Config (한 곳에서 로직 관리) ----
  /** 1) 이름 입력 */
  if (step === 'Name') {
    return (
      <>
        {/* Name 단계: 브라우저 이전 페이지로 돌아갈 수 있도록 기본 동작 유지 */}
        <TopNavigation title="" showBackButton />
        <StepProgress total={total} active={currentIndex} className="mb-2" />
        <StepName
          roleLabel={context.role}
          defaultName={context.name}
          onNext={(name) => history.push('PreferCuisine', (prev) => ({ ...prev, name }))}
        />
      </>
    );
  }

  /** 2) 선호 음식 선택 (칩 + '다 괜찮아요!'는 단독) */
  if (step === 'PreferCuisine') {
    const options: ChipOption[] = CUISINE_OPTIONS.map((o) => ({
      id: o.id,
      label: o.label,
      variant: o.id === ANY_ID ? 'any' : 'cuisine',
    }));

    return (
      <>
        {/* ← 뒤로가기: 이전 스텝('Name')으로 이동 */}
        <TopNavigation
          title=""
          showBackButton
          onLeftClick={() => history.replace('Name', (p) => p)}
        />
        <StepProgress total={total} active={currentIndex} className="mb-2" />
        <StepChipSelect
          key="PreferCuisine" // 단계별 다른 key
          roleLabel={context.role}
          title="선호하는 음식을 골라주세요"
          subtitle="여러 개 선택 가능 · '다 괜찮아요!'는 단독 선택"
          options={options}
          defaultSelectedIds={context.preferCuisineIds}
          exclusiveIds={[ANY_ID]}
          onBack={() => history.replace('Name', (p) => p)}
          onNext={(preferCuisineIds) => {
            const nextIds = preferCuisineIds.includes(ANY_ID) ? [ANY_ID] : preferCuisineIds;
            history.push('DislikeCuisine', (prev) => ({ ...prev, preferCuisineIds: nextIds }));
          }}
        />
      </>
    );
  }

  /** 3) 비선호 음식 선택 (선호에서 고른 것은 제외 + ANY 노출) */
  if (step === 'DislikeCuisine') {
    // '선호'에서 ANY를 골랐다면 '모두 허용' 의미 → '비선호' 후보는 전체(ANY 포함)
    const excluded = context.preferCuisineIds.includes(ANY_ID) ? [] : context.preferCuisineIds;
    const base = CUISINE_OPTIONS;

    // ANY는 항상 맨 앞에 노출, 나머지는 선호 제외 필터링
    const dislikeCandidates: Option[] = [
      base.find((o) => o.id === ANY_ID)!, // non-null 단언(테이블 상 항상 존재)
      ...base.filter((o) => o.id !== ANY_ID && !excluded.includes(o.id)),
    ];
    const options: ChipOption[] = dislikeCandidates.map((o) => ({
      id: o.id,
      label: o.label,
      variant: o.id === ANY_ID ? 'any' : 'cuisine',
    }));

    return (
      <>
        {/* ← 뒤로가기: 이전 스텝('PreferCuisine')으로 이동 */}
        <TopNavigation
          title=""
          showBackButton
          onLeftClick={() => history.replace('PreferCuisine', (p) => p)}
        />
        <StepProgress total={total} active={currentIndex} className="mb-2" />
        <StepChipSelect
          key="DislikeCuisine" // 단계별 다른 key
          roleLabel={context.role}
          title="선호하지 않는 음식을 골라주세요"
          subtitle="여러 개 선택 가능 · '다 괜찮아요!'는 단독 선택(아무거나 상관없음)"
          options={options}
          defaultSelectedIds={context.dislikeCuisineIds}
          exclusiveIds={[ANY_ID]}
          onBack={() => history.replace('PreferCuisine', (p) => p)}
          onNext={(dislikeCuisineIds) => {
            history.push('Review', (prev) => ({ ...prev, dislikeCuisineIds }));
          }}
        />
      </>
    );
  }

  /** 4) 선택 결과 확인 → 완료/분기 */
  if (step === 'Review') {
    const prefer = CUISINE_OPTIONS.filter((o) => context.preferCuisineIds.includes(o.id));
    const dislike = CUISINE_OPTIONS.filter((o) => context.dislikeCuisineIds.includes(o.id));

    return (
      <>
        {/* ← 뒤로가기: 이전 스텝('DislikeCuisine')으로 이동 */}
        <TopNavigation
          title=""
          showBackButton
          onLeftClick={() => history.replace('DislikeCuisine', (p) => p)}
        />
        <StepProgress total={total} active={currentIndex} className="mb-2" />
        <StepReview
          roleLabel={context.role}
          name={context.name}
          prefer={prefer}
          dislike={dislike}
          onBack={() => history.replace('DislikeCuisine', (p) => p)}
          // --- (확장) 분기: '한식' 선택 시 '한식 후속 설문'으로 보내기 ---
          onSubmit={() => {
            const enableBranch = context.hostFlags?.enableCuisineBranch;
            const hasKorean = context.preferCuisineIds.includes('c:korean');
            if (enableBranch && hasKorean) {
              history.push('KoreanFollowUp', (p) => p);
              return;
            }

            // 기본은 Complete로 진행
            const result: SurveyResult = { ...context };
            onComplete?.(result);
            history.push('Complete', (p) => p);
          }}
        />
      </>
    );
  }

  /** (예시) 한식 상세 분기 스텝 — 현재는 패스스루 */
  if (step === 'KoreanFollowUp') {
    // 예: StepKoreanFollowUp 컴포넌트 렌더 → 완료 시 Complete로
    return (
      <>
        {/* ← 뒤로가기: 리뷰로 되돌리기(또는 필요 시 이전 분기 스텝) */}
        <TopNavigation
          title="한식 추가 설문"
          showBackButton
          onLeftClick={() => history.replace('Review', (p) => p)}
        />
        <StepProgress total={total} active={currentIndex} className="mb-2" />
        <div className="mx-auto max-w-[480px] px-4 py-6">
          <h1 className="text-2xl font-bold md:text-3xl">한식 선호 상세 질문 (준비 중)</h1>
          <p className="mt-2 text-gray-600">추후 분기 설문이 여기에 들어갑니다.</p>
          <div className="mt-6 flex justify-end">
            <button
              className="rounded-xl bg-black px-4 py-2 text-sm text-white"
              onClick={() => {
                const result: SurveyResult = { ...context };
                onComplete?.(result);
                history.push('Complete', (p) => p);
              }}
            >
              완료로 이동
            </button>
          </div>
        </div>
      </>
    );
  }

  /** 5) 완료 (간단 안내; 후속 추천 페이지로 연결 가능) */
  return (
    <>
      {/* 완료 페이지는 브라우저 back 동작 유도(TopNavigation 생략 가능) */}
      <StepProgress total={total} active={currentIndex} className="mb-2" />
      <div className="mx-auto max-w-[480px] px-4 py-12 text-center">
        <h1 className="text-2xl font-bold md:text-3xl">설문이 완료되었습니다 🎉</h1>
        <p className="mt-3 text-gray-600">추천 결과를 준비 중이에요.</p>
      </div>
    </>
  );
};

export default SurveyFunnel;

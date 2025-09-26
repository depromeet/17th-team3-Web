'use client';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import StepIndicator from '@/app/_components/ui/StepIndicator';
import { cn } from '@/app/_lib/cn';

interface SurveyLayoutProps {
  /** 1-base 현재 스텝 값 (StepIndicator 와 동일 기준)*/
  stepValue: number;
  /** 전체 스텝 수 */
  totalSteps: number;
  /** 상단 뒤로가기 핸들러 */
  onBack: () => void;
  /** 상단 타이틀(옵션) */
  title?: string;
  /** 본문 */
  children: React.ReactNode;
  /** 레이이웃 className 커스텀(옵션) */
  className?: string;
  navClassName?: string; // 👈 추가
}

/**
 * SurveyLayout
 * - 상단 네비 + 스텝 인디케이터 + 본문 컨테이너
 * - meetings/create와 동일한 상단 구성을 재사용
 */
const SurveyLayout = ({
  stepValue,
  totalSteps,
  onBack,
  title = '',
  children,
  className,
  navClassName,
}: SurveyLayoutProps) => {
  return (
    <div className={cn('flex min-h-screen flex-col background-1', className)}>
      <TopNavigation
        title={title}
        showBackButton
        onLeftClick={onBack}
        className={cn('bg-inherit', navClassName)} // 👈 여기서 덮어쓰기
      />
      <div className="flex items-center justify-center px-4 py-1.5">
        <StepIndicator value={stepValue} total={totalSteps} />
      </div>
      {/* 본문 영역 */}
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </div>
  );
};

export default SurveyLayout;

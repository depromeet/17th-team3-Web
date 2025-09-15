'use client';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

/**
 * 도메인 전용 섹션 헤더
 * - 추후 StepMultiSelect 상단 헤더를 대체/공용화할 수 있다.
 * - 지금은 미사용 상태로 두고, 점진적 적용을 권장.
 */
const SectionHeader = ({ title, subtitle, align = 'left' }: SectionHeaderProps) => {
  return (
    <header className={`mb-5 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h1 className="mt-1 text-2xl font-bold text-balance break-keep md:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 text-sm text-gray-600 md:text-base">{subtitle}</p>}
    </header>
  );
};

export default SectionHeader;

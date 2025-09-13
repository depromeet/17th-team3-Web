/**
 * /survey (Server Component)
 * - URL 쿼리로 역할을 선택: ?role=주최자 (기본: 참여자)
 * - CSR 전용 셸(SurveyClientShell)이 내부에서 동적 로딩을 처리
 */
/** src/app/survey/page.tsx */
import SurveyClientShell from '@/app/survey/_components/SurveyClientShell';

import type { RoleLabel } from '@/app/survey/_models/types';

const SurveyPage = ({ searchParams }: { searchParams?: { role?: string } }) => {
  const role: RoleLabel = searchParams?.role === '주최자' ? '주최자' : '참여자';
  return <SurveyClientShell role={role} />;
};

export default SurveyPage;

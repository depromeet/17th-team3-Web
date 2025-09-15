import SurveyClientShell from '@/app/survey/_components/SurveyClientShell';

import type { RoleLabel } from '@/app/survey/_models/types'; // 경로는 프로젝트에 맞게

/**
 * /survey (Server Component)
 * - URL 쿼리로 역할을 선택: ?role=주최자 (기본: 참여자)
 * - CSR 전용 셸(SurveyClientShell)이 내부에서 동적 로딩을 처리
 */
const SurveyPage = async ({ searchParams }: { searchParams: Promise<{ role?: string }> }) => {
  const { role } = await searchParams; // ← 반드시 await
  const roleLabel: RoleLabel = role === '주최자' ? '주최자' : '참여자';
  return <SurveyClientShell role={roleLabel} />;
};

export default SurveyPage;

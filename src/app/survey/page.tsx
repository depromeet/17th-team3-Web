import SurveyClientShell from '@/app/survey/_components/core/SurveyClientShell';

import type { RoleLabel } from '@/app/survey/_models/types';

/** 페이지 엔트리(서버 컴포넌트)
 * - 쿼리로 role을 받아 '주최자' | '참여자' 라벨 결정
 * - 실제 퍼널 UI는 CSR 전용 셸(SurveyClientShell)에서 구동
 */
const SurveyPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; meetingId?: string }>;
}) => {
  const { role, meetingId } = await searchParams;

  // todo: 쿼리스트링 -> 상태 관리
  // URL ?role=주최자 일 때만 주최자, 그 외엔 참여자
  const roleLabel: RoleLabel = role === '주최자' ? '주최자' : '참여자';
  const meetingIdNumber = Number(meetingId ?? '83'); // 없으면 1 (혹은 에러 처리)
  return <SurveyClientShell role={roleLabel} meetingId={meetingIdNumber} />;
};
export default SurveyPage;

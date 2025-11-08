import SurveyClientShell from '@/app/survey/_components/core/SurveyClientShell';

import type { RoleLabel } from '@/app/survey/_models/types';

/** SurveyPage
 * 설문 퍼널 진입 페이지
 * - URL 쿼리(role, meetingId)를 파싱하여 초기 props 전달
 * - 실제 CSR 퍼널은 SurveyClientShell에서 렌더링됨
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
  const meetingIdNumber = Number(meetingId ?? '106'); // TEST: 모임 방 번호 설정
  return <SurveyClientShell role={roleLabel} meetingId={meetingIdNumber} />;
};
export default SurveyPage;

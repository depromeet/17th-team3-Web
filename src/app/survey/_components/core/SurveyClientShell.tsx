'use client';
import SurveyClient from '@/app/survey/_components/core/SurveyClient';

import type { RoleLabel, SurveyResult } from '../../_models/types';

interface SurveyClientShellProps {
  role: RoleLabel;
  meetingId: number;
  initial?: Partial<SurveyResult>;
}

/** CSR 전용 셸
 * - Server Component에서 직접 dynamic({ ssr:false }) 사용하는 대신
 *   Client Shell로 감싸 안전하게 CSR-only 트리 시작
 */
const SurveyClientShell = (props: SurveyClientShellProps) => {
  return <SurveyClient {...props} />;
};

export default SurveyClientShell;

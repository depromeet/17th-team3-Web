'use client';
import { useRouter } from 'next/navigation';

import SurveyFunnel from './SurveyFunnel';

import type { RoleLabel, SurveyResult } from '../../_models/types';

/** SurveyClient
 * - 완료 시 후속 액션(예: 서버 저장) 후 완료 페이지로 이동
 * - 실제 퍼널 오케스트레이션은 SurveyFunnel에 위임
 */
const SurveyClient = ({ role, initial }: { role: RoleLabel; initial?: Partial<SurveyResult> }) => {
  const router = useRouter();
  const handleComplete = async (_data: SurveyResult) => {
    // TODO: 서버 저장 로직
    router.push('/survey/complete');
  };
  return <SurveyFunnel role={role} initial={initial} onComplete={handleComplete} />;
};

export default SurveyClient;

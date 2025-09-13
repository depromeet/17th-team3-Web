/**
 * SurveyClient
 * - CSR 전용 컨테이너(라우팅/비동기 처리 등 클라이언트 기능 포함)
 * - 내부에서 SurveyFunnel을 렌더링하고 완료 시 페이지 이동
 */
'use client';

import type { FC } from 'react';

import { useRouter } from 'next/navigation';

import SurveyFunnel from './SurveyFunnel';

import type { RoleLabel, SurveyResult } from '../_models/types';

type Props = { role: RoleLabel; initial?: Partial<SurveyResult> };

const SurveyClient: FC<Props> = ({ role, initial }) => {
  const router = useRouter();

  // 완료 시, 결과 저장 등을 처리한 뒤 완료 페이지로 이동
  const handleComplete = async (_data: SurveyResult) => {
    // await saveSurveyResult(_data);
    router.push('/survey/complete');
  };

  return <SurveyFunnel role={role} initial={initial} onComplete={handleComplete} />;
};

export default SurveyClient;

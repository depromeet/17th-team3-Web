// src/app/survey/_components/SurveyClient.tsx
'use client';

import type { FC } from 'react';

import { useRouter } from 'next/navigation';

import SurveyFunnel from './SurveyFunnel';

import type { RoleLabel, SurveyResult } from '../_models/types';

type Props = {
  role: RoleLabel;
  initial?: Partial<SurveyResult>;
};

const SurveyClient: FC<Props> = ({ role, initial }) => {
  const router = useRouter();

  const handleComplete = async (_data: SurveyResult) => {
    // await saveSurveyResult(_data);
    router.push('/survey/complete');
  };

  return <SurveyFunnel role={role} initial={initial} onComplete={handleComplete} />;
};

export default SurveyClient;

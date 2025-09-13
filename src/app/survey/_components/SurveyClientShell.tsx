/** src/app/survey/_components/SurveyClientShell.tsx */
'use client';
import type { FC } from 'react';

import dynamic from 'next/dynamic';

import type { RoleLabel, SurveyResult } from '../_models/types';

type Props = { role: RoleLabel; initial?: Partial<SurveyResult> };

const SurveyClient = dynamic<Props>(() => import('./SurveyClient'), { ssr: false });

const SurveyClientShell: FC<Props> = (props) => <SurveyClient {...props} />;

export default SurveyClientShell;

'use client';

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import type { RoleLabel } from '../_models/types';

type Props = { role: RoleLabel };

const SurveyClient = dynamic<Props>(() => import('./SurveyClient'), { ssr: false });

const SurveyClientShell: FC<Props> = (props) => <SurveyClient {...props} />;

export default SurveyClientShell;

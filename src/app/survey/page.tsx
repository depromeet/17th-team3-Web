import SurveyClientShell from '@/app/survey/_components/SurveyClientShell';

import type { RoleLabel } from '@/app/survey/_models/types';

const SurveyPage = ({ searchParams }: { searchParams?: { role?: string } }) => {
  const role: RoleLabel = searchParams?.role === '주최자' ? '주최자' : '참여자';
  return <SurveyClientShell role={role} />;
};

export default SurveyPage;

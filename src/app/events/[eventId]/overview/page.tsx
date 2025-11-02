import { redirect } from 'next/navigation';

import { ApiError } from '@/app/_models/api';
import { meetingsApi } from '@/app/_services/meetings';
import { getMockOverview } from '@/app/_services/overview';
import { isAlreadyJoined, isAccessDenied } from '@/app/_utils/errorGuards';
import PersonaCardSwiper from '@/app/events/[eventId]/overview/_components/persona/PersonaCardSwiper';
import SurveyActionButton from '@/app/events/[eventId]/overview/_components/SurveyActionButton';
import SurveyStatusBanner from '@/app/events/[eventId]/overview/_components/SurveyStatusBanner';

//--------------------------------Page--------------------------------

interface OverviewPageProps {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ token?: string }>;
}

/**
 * 토큰이 있는 경우 검증 및 모임 참여 처리
 * @param token - 초대 토큰
 * @throws 진입 불가능한 에러인 경우 리다이렉트
 */
const handleTokenValidationAndJoin = async (eventId: string, token: string): Promise<void> => {
  try {
    await meetingsApi.validateToken(token);
    await meetingsApi.joinMeeting(token);
  } catch (error) {
    const apiError = error as ApiError;

    if (isAlreadyJoined(apiError)) {
      return;
    }
    if (isAccessDenied(apiError)) {
      redirect('/');
    }

    redirect('/');
  }
};

const OverviewPage = async ({ params, searchParams }: OverviewPageProps) => {
  const { eventId } = await params;
  const { token } = await searchParams;

  if (token) {
    await handleTokenValidationAndJoin(eventId, token);
  }

  // TODO: 모임 설문 데이터 요청 시, 백엔드에서 사용자가 진입 권한이 있는지 검증 로직 필요 (토큰 없이 진입 시)
  const overviewData = await getMockOverview(eventId);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center gap-6 px-5 py-4">
        <SurveyStatusBanner variant="progress" />
        {/* 하단 모임 참여 상태 공간 차지 */}
        <div className="h-[75px]" />
      </div>
      <div className="flex flex-1 flex-col">
        <PersonaCardSwiper overview={overviewData} />
      </div>
      <SurveyActionButton variant="join" />
    </div>
  );
};
export default OverviewPage;

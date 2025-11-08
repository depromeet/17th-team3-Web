import { redirect } from 'next/navigation';

import { ApiError } from '@/app/_models/api';
import { meetingsApi } from '@/app/_services/meetings';
import { isAccessDenied, isAlreadyJoined } from '@/app/_utils/errorGuards';

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
      return redirect(`/?error=${apiError.code}`);
    }

    return redirect('/');
  }
};

interface EventLayoutProps {
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
  params: Promise<{ eventId: string }>;
}

const EventLayout = async ({ children, searchParams, params }: EventLayoutProps) => {
  const token = searchParams?.token as string;
  const { eventId } = await params;

  if (token) {
    await handleTokenValidationAndJoin(eventId, token);
  }

  return <>{children}</>;
};

export default EventLayout;

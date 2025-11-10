'use client';

import { useEffect, useMemo } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Button from '@/app/_components/ui/Button';
import { useCountdownDisplay } from '@/app/_hooks/useCountdownDisplay';
import { MeetingOverview } from '@/app/_services/overview';
import useOverviewState from '@/app/events/[eventId]/overview/_hooks/useOverviewState';

const SurveyActionButton = ({ overview }: { overview: MeetingOverview }) => {
  const router = useRouter();
  const { eventId } = useParams();

  const { hasParticipated } = useOverviewState(overview);
  const isSurveyClosed = overview.meetingInfo.isClosed;
  const isEveryoneCompleted =
    overview.participantList.length === overview.meetingInfo.totalParticipantCnt;
  const countdown = useCountdownDisplay(new Date(overview.meetingInfo.endAt));

  const buttonState = useMemo(() => {
    if (!hasParticipated) return { label: '설문 참여하기', path: `/meetings/${eventId}/survey` };
    if (isSurveyClosed || isEveryoneCompleted)
      return { label: '추천 결과 보기', path: `/events/${eventId}/analysis` };
    return {
      label: (
        <>
          <span className="body-3 font-semibold">설문 마감까지</span> {countdown}
        </>
      ),
      path: null,
    };
  }, [hasParticipated, isSurveyClosed, countdown, eventId]);

  const handleClick = () => {
    if (buttonState.path) router.push(buttonState.path);
  };

  useEffect(() => {
    if (isSurveyClosed) {
      router.prefetch(`/events/${eventId}/analysis`);
    }
  }, [isSurveyClosed, eventId, router]); // 설문 마감 후 추천 결과 페이지 미리 로드

  return (
    <div className="sticky bottom-0 px-5 pt-3 pb-6">
      <Button onClick={handleClick}>
        <span className="body-3 font-semibold text-white">{buttonState.label}</span>
      </Button>
    </div>
  );
};

export default SurveyActionButton;

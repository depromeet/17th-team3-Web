'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

import Button from '@/app/_components/ui/Button';
import { ApiError } from '@/app/_models/api';
import { getOverviewQueryOptions } from '@/app/_queries/overviewQueries';
import { MeetingOverview } from '@/app/_services/overview';

type SurveyActionVariant = 'join' | 'closing-soon' | 'show-result';

interface SurveyActionButtonProps {
  variant: SurveyActionVariant;
}

const BUTTON_LABEL_MAP: Record<SurveyActionVariant, string> = {
  join: '설문 참여하기',
  'closing-soon': '설문 마감임박', // 추후 카운트다운 붙일 자리
  'show-result': '추천 결과 보기',
};

const SurveyActionButton = ({ variant }: SurveyActionButtonProps) => {
  const router = useRouter();
  const params = useParams();
  const { eventId } = params;

  const { data: overview, isPending } = useQuery<MeetingOverview, ApiError>({
    ...getOverviewQueryOptions(Number(eventId)),
  });

  const handleClick = () => {
    if (variant === 'join') {
      router.push('/survey');
    } else if (variant === 'closing-soon') {
      router.push('/recommendations/sAmCHo/result');
    }
  };
  return (
    <div className="sticky bottom-0 px-5 pt-3 pb-6">
      <Button onClick={handleClick}>{BUTTON_LABEL_MAP[variant]}</Button>
    </div>
  );
};

export default SurveyActionButton;

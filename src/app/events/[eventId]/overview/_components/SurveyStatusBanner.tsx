import { cn } from '@/app/_lib/cn';

type SurveyStatusVariant = 'progress' | 'closed' | 'completed';

const SURVEY_STATUS_MAP = {
  progress: {
    label: '취향 설문 진행 중이에요',
    className: 'title-gradient',
  },
  closed: {
    label: '설문 기간이 종료됐어요',
    className: 'text-neutral-1400',
  },
  completed: {
    label: '모두 설문을 완료했어요',
    className: 'text-neutral-1400',
  },
} as const satisfies Record<SurveyStatusVariant, { label: string; className: string }>;

interface SurveyStatusBannerProps {
  variant: SurveyStatusVariant;
}

const SurveyStatusBanner = ({ variant }: SurveyStatusBannerProps) => {
  const { label, className } = SURVEY_STATUS_MAP[variant];

  return <p className={cn('heading-2 font-bold', className)}>{label}</p>;
};

export default SurveyStatusBanner;

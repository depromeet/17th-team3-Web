'use client';

import { useQueryState, parseAsInteger } from 'nuqs';

import Button from '@/app/_components/ui/Button';
import { cn } from '@/app/_lib/cn';

const MorePicksButton = () => {
  const [picks, setPicks] = useQueryState('picks', parseAsInteger.withDefault(5));

  const handleClick = () => {
    setPicks((v) => (v ?? 5) + 5, { history: 'replace' });
  };

  return (
    <div className={cn('sticky bottom-0 px-5 py-3', picks === 10 && 'hidden')}>
      <Button theme="cta-gradient" onClick={handleClick}>
        5개 더 추천받기
      </Button>
    </div>
  );
};

export default MorePicksButton;

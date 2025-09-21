import { cn } from '@/app/_lib/cn';
import { getProgressPercent } from '@/app/_utils/ui';

interface StepIndicatorProps {
  value: number;
  total: number;
}

const StepIndicator = ({ value, total }: StepIndicatorProps) => {
  const percent = getProgressPercent(value, total);

  return (
    <div className={cn('h-1 w-full overflow-hidden rounded-full bg-orange-100')}>
      <div className="h-full transition-all chip-gradient" style={{ width: `${percent}%` }}></div>
    </div>
  );
};

export default StepIndicator;

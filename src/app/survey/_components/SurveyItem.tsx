import { cn } from '@/app/_lib/cn';

interface SurveyItemProps {
  children: React.ReactNode;
  selected?: boolean;
}

const SurveyItem = ({ children, selected = false }: SurveyItemProps) => {
  return (
    <div
      className={cn(
        'flex h-[52px] items-center justify-center rounded-lg bg-white text-sm font-medium',
        // todo: 스타일 변경 필요
        selected && 'border border-[#FF4F14] bg-[#FF4F1410]'
      )}
    >
      {children}
    </div>
  );
};

export default SurveyItem;

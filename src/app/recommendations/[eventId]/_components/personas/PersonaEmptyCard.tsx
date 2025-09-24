import { Copy } from 'lucide-react';

import Button from '@/app/_components/ui/Button';
import { cn } from '@/app/_lib/cn';

interface EmptyPersonaCardProps {
  cardRef?: React.RefCallback<HTMLDivElement | null>;
  className?: string;
}

const EmptyPersonaCard = ({ cardRef, className }: EmptyPersonaCardProps) => {
  return (
    <div
      ref={cardRef}
      data-id="empty-card"
      className={cn(
        'flex w-11/12 shrink-0 flex-col items-center justify-center gap-7 rounded-[1.25rem] px-5 py-6',
        className
      )}
    >
      <p className="subheading-1 font-bold text-orange-800">아직 참여하지 않았어요</p>
      <div className="flex w-full flex-col items-center justify-center gap-4 px-3">
        <Button theme="orange" className="gap-2 bg-orange-700 py-3 label-1 font-semibold">
          <Copy className="h-4 w-4" absoluteStrokeWidth />
          <span>링크 복사해서 공유하기</span>
        </Button>
        <div className="text-center label-1 font-medium text-orange-700">
          <p>모두 함께해야 추천이 시작돼요.</p>
          <p>지금 링크로 초대해보세요!</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyPersonaCard;

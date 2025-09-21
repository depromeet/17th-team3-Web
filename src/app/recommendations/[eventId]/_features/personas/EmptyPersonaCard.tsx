import { Copy } from 'lucide-react';

import Button from '@/app/_components/ui/Button';
import { cn } from '@/app/_lib/cn';

/**
 * 빈 참석자 카드 컴포넌트의 Props
 */
interface EmptyPersonaCardProps {
  /** 카드 element ref */
  cardRef?: React.RefCallback<HTMLDivElement | null>;
  /** data-id 속성 */
  'data-id'?: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 아직 참여하지 않은 참석자를 위한 빈 카드 컴포넌트
 * 링크 공유 기능을 제공함
 */
const EmptyPersonaCard = ({ cardRef, 'data-id': dataId, className }: EmptyPersonaCardProps) => {
  return (
    <div
      ref={cardRef}
      data-id={dataId}
      className={cn(
        'flex w-11/12 shrink-0 flex-col items-center justify-center gap-7 rounded-[1.25rem] px-5 py-6',
        className
      )}
    >
      <p className="subheading-1 font-bold text-orange-800">아직 참여하지 않았어요</p>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <Button theme="orange" className="gap-2 bg-orange-700 label-1 font-semibold">
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

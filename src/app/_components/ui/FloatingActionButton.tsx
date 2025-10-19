import { Plus } from 'lucide-react';

import { cn } from '@/app/_lib/cn';

interface FloatingActionButtonProps {
  onClick?: () => void;
  className?: string;
}

const FloatingActionButton = ({ onClick, className }: FloatingActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'absolute right-5 bottom-10 flex h-15 w-15 cursor-pointer items-center justify-center rounded-full chip-gradient',
        className
      )}
      aria-label="모임 만들기"
    >
      <Plus size={32} className="text-orange-50" />
    </button>
  );
};

export default FloatingActionButton;

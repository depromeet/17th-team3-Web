import { Minus, Plus } from 'lucide-react';

import Input, { InputProps } from '@/app/_components/ui/Input';
import { cn } from '@/app/_lib/cn';
import { MEETING_SIZE } from '@/app/meetings/_models/constants';

export interface StepperInputProps extends Omit<InputProps, 'type' | 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const StepperInput = ({
  value,
  onChange,
  min = MEETING_SIZE.MIN,
  max = MEETING_SIZE.MAX,
  className,
  ...props
}: StepperInputProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value) || min;
    onChange(newValue);
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    onChange(value - 1);
  };

  const canIncrement = value < max;
  const canDecrement = value > min;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={!canDecrement}
        className={cn(
          'absolute top-4 left-3 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md transition-colors',
          canDecrement
            ? 'bg-orange-100 text-orange-500'
            : 'cursor-not-allowed bg-neutral-400 text-neutral-600'
        )}
        aria-label="감소"
      >
        <Minus size={20} strokeWidth={2} />
      </button>

      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        readOnly
        min={min}
        max={max}
        showClearButton={false}
        className={cn('p-3 text-center focus:border-b-1 focus:border-b-neutral-300', className)}
        {...props}
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={!canIncrement}
        className={cn(
          'absolute top-4 right-3 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md transition-colors',
          canIncrement
            ? 'bg-orange-100 text-orange-500'
            : 'cursor-not-allowed bg-neutral-400 text-neutral-600'
        )}
        aria-label="증가"
      >
        <Plus size={20} strokeWidth={2} />
      </button>
    </div>
  );
};

export default StepperInput;

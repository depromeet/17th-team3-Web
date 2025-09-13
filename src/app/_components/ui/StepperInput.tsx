import { Minus, Plus } from 'lucide-react';

import Input, { InputProps } from '@/app/_components/ui/Input';
import { cn } from '@/app/_lib/cn';

export interface StepperInputProps extends Omit<InputProps, 'type' | 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const StepperInput = ({
  value,
  onChange,
  min = 2,
  max = 9,
  className,
  ...props
}: StepperInputProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value) || min;
    onChange(newValue);
  };

  const handleIncrement = () => {
    console.log('zcxvzxc');
    onChange(value + 1);
  };

  const handleDecrement = () => {
    console.log('1231233');
    onChange(value - 1);
  };

  console.log(value, max, min);

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
            ? 'bg-[#FF4F1420] text-[#FF4F14]'
            : 'cursor-not-allowed bg-[#9BA3B020] text-[#9BA3B0]'
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
        className={cn('p-3 text-center focus:border-b-gray-300', className)}
        {...props}
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={!canIncrement}
        className={cn(
          'absolute top-4 right-3 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md transition-colors',
          canIncrement
            ? 'bg-[#FF4F1420] text-[#FF4F14]'
            : 'cursor-not-allowed bg-[#9BA3B020] text-[#9BA3B0]'
        )}
        aria-label="증가"
      >
        <Plus size={20} strokeWidth={2} />
      </button>
    </div>
  );
};

export default StepperInput;

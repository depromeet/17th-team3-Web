import { Minus, Plus } from 'lucide-react';

import { cn } from '@/app/_lib/cn';

import Input, { InputProps } from './Input';

export interface NumberInputProps extends Omit<InputProps, 'type' | 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const NumberInput = ({
  value,
  onChange,
  min = 2,
  max = 9,
  className,
  ...props
}: NumberInputProps) => {
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
          'flex h-6 w-6 items-center justify-center rounded-md transition-colors',
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
        className={cn('text-center focus:border-b-gray-300', className)}
        {...props}
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={!canIncrement}
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-md transition-colors',
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

export default NumberInput;

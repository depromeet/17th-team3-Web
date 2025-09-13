import { Minus, Plus } from 'lucide-react';

import { cn } from '@/app/_lib/cn';

import Input, { InputProps } from './Input';

// 기존 Input onChange가 다른 타입이므로
export interface NumberInputProps extends Omit<InputProps, 'type' | 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const NumberInput = ({
  value,
  onChange,
  min = 0,
  max = 20, // 최대 인원수 20명으로 기본값 설정
  className,
  ...props
}: NumberInputProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value) || 0;
    const clampedValue = Math.min(Math.max(newValue, min), max);
    onChange(clampedValue);
  };

  const handleDecrement = () => {
    onChange(Math.max(value, min));
  };

  const handleIncrement = () => {
    onChange(Math.min(value, max));
  };

  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <div className="relative">
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className={cn('pr-20 text-center', className)}
        {...props}
      />

      <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={!canDecrement}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
            canDecrement
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'cursor-not-allowed bg-gray-100 text-gray-400'
          )}
          aria-label="감소"
        >
          <Minus className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={!canIncrement}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
            canIncrement
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'cursor-not-allowed bg-gray-100 text-gray-400'
          )}
          aria-label="증가"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default NumberInput;

import { ComponentPropsWithoutRef, RefObject } from 'react';

import { Search, X } from 'lucide-react';

import { cn } from '@/app/_lib/cn';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  ref?: RefObject<HTMLInputElement>;
  variant?: 'default' | 'search';
  hasError?: boolean;
  errorMessage?: string;
  // todo: 유효성 검증 기획에 따라 컴포넌트 내부로 이관 가능
  helperText?: string;
  onClear?: () => void;
  className?: string;
}

const Input = ({
  ref,
  variant = 'default',
  hasError = false,
  errorMessage,
  helperText,
  placeholder: defaultPlaceholder,
  value,
  onChange,
  onClear,
  className,
  ...props
}: InputProps) => {
  const handleClear = () => {
    onClear?.();
  };

  const placeholder = defaultPlaceholder ?? (variant === 'search' ? '강남역' : '모임 이름 입력');
  const showClearButton = value && String(value).length > 0;

  return (
    <>
      <div className="relative flex items-center">
        {variant === 'search' && <Search className="absolute left-3 h-4 w-4 text-gray-400" />}
        <input
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'w-full px-3 py-3 text-xl font-semibold transition-all duration-200',
            'placeholder:text-gray-400 focus:outline-none',
            'border-0 border-b-2',
            showClearButton && 'pr-10',
            // todo: 에러 상태 스타일
            hasError ? 'border-b-red-500' : 'border-b-gray-300 focus:border-b-gray-600',
            variant === 'search' && 'pl-10',
            className
          )}
          {...props}
        />

        {showClearButton && (
          <button
            onClick={handleClear}
            className="absolute right-3 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-gray-400 text-white transition-colors hover:bg-gray-500"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {(hasError && errorMessage) || helperText ? (
        <div className="mt-2 px-1">
          <p className={cn('text-xs', hasError ? 'text-red-600' : 'text-gray-500')}>
            {hasError && errorMessage ? errorMessage : helperText}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default Input;

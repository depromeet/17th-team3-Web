import { ComponentPropsWithoutRef, RefObject } from 'react';

import { Search, X } from 'lucide-react';

import { cn } from '@/app/_lib/cn';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  ref?: RefObject<HTMLInputElement>;
  hasError?: boolean;
  errorMessage?: string;
  // todo: 유효성 검증 기획에 따라 컴포넌트 내부로 이관 가능
  helperText?: string;
  onClear?: () => void;
  showClearButton?: boolean;
  className?: string;
}

const Input = ({
  ref,
  type = 'text',
  hasError = false,
  errorMessage,
  helperText,
  placeholder: defaultPlaceholder,
  value,
  onChange,
  onClear,
  showClearButton = true,
  className,
  ...props
}: InputProps) => {
  const handleClear = () => {
    onClear?.();
  };

  const isSearchType = type === 'search';
  const placeholder = defaultPlaceholder ?? (isSearchType ? '강남역' : '모임 이름 입력');
  const shouldClearButton = showClearButton && value && String(value).length > 0;

  return (
    <>
      <div className="relative flex items-center">
        {isSearchType && (
          <Search size={32} strokeWidth={3} className="absolute left-3 h-4 w-4 text-neutral-500" />
        )}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'w-full px-3 py-3 body-1 font-semibold transition-all duration-200',
            'border-b-gray-300 placeholder:text-neutral-500 focus:border-b-orange-500 focus:outline-none',
            'border-0 border-b-1 focus:border-b-2',
            shouldClearButton && 'pr-10',
            isSearchType && 'pl-10',
            className
          )}
          {...props}
        />

        {shouldClearButton && (
          <button
            type="button"
            aria-label="입력 내용 지우기"
            onClick={handleClear}
            className="absolute right-3 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-neutral-500 text-white transition-colors"
          >
            <X strokeWidth={4} className="h-3 w-3" />
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

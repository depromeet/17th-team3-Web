import { type ButtonHTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/app/_lib/cn';

const buttonVariants = cva(
  'flex h-[62px] items-center w-full justify-center gap-1 rounded-[14px] text-[16px] font-[500] hover:cursor-pointer shrink-0 ',
  {
    variants: {
      theme: {
        orange: 'text-white bg-orange-500 active:bg-orange-600',
        gray: 'text-black bg-gray-200 active:bg-gray-300',
      },
      status: {
        normal: 'hover:opacity-90 hover:opacity-90 ',
        disabled: 'cursor-not-allowed opacity-50',
      },
    },
    defaultVariants: {
      theme: 'orange',
      status: 'normal',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

/**
 * 재사용 가능한 Button 컴포넌트
 *
 * @description CVA를 사용하여 theme과 status 변형을 타입 안전하게 관리하는 버튼 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <Button>기본 버튼</Button>
 *
 * // 테마 변경
 * <Button theme="gray">회색 버튼</Button>
 *
 * // 상태 변경
 * <Button status="disabled">비활성화</Button> * disabled는 테마 적용을 위해 status로 사용
 *
 * // HTML 속성 사용
 * <Button type="submit" onClick={() => {}}>
 *   제출
 * </Button>
 *
 * // 커스텀 스타일
 * <Button className="bg-blue-500 text-white">
 *   커스텀
 * </Button>
 * ```
 *
 * @param theme - 버튼 색상 테마 ('orange' | 'gray')
 * @param status - 버튼 상태 ('normal' | 'disabled')
 * @param children - 버튼 내부 콘텐츠
 * @param className - 추가 CSS 클래스 (variant 스타일과 병합됨)
 * @param props - 모든 HTML button 속성 지원 (type, onClick, ref 등)
 *
 * @returns JSX.Element
 */
const Button = ({ className, theme, status, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ theme, status }), className)}
      disabled={status === 'disabled'}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

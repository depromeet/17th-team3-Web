import { type HTMLAttributes } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/app/_lib/cn';

const buttonVariants = cva(
  'flex h-[62px] items-center w-full justify-center gap-1 rounded-[14px] text-[16px] font-[500] hover:cursor-pointer ',
  {
    variants: {
      theme: {
        orange: 'text-white bg-orange-500 active:bg-orange-600',
        gray: 'text-black bg-gray-200 active:bg-gray-300',
      },
      status: {
        normal: 'hover:opacity-90',
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
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  className,
  theme,
  status,
  children,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ theme, status, className }))}
      type={type}
      disabled={status === 'disabled'}
      {...props}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button, buttonVariants };

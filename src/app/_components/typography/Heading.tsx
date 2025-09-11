import { JSX } from 'react';

import { cn } from '@/app/_lib/cn';

interface HeadingProps {
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ level = 'h1', as, children, className }: HeadingProps) => {
  const Tag = as ?? level;
  // todo: 디자인시스템 확인 후, 스타일 점검
  const styles = {
    h1: 'text-2xl/[1.5] font-bold',
    h2: 'text-xl/[1.4] font-semibold',
    h3: 'text-lg/[1.3] font-semibold',
    h4: 'text-base/[1.2] font-semibold',
  };

  return <Tag className={cn(styles[level], className)}>{children}</Tag>;
};

export default Heading;

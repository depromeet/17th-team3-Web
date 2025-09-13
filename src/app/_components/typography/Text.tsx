import { cn } from '@/app/_lib/cn';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

const Text = ({ children, className }: TextProps) => {
  // todo: 디자인시스템 확인 후, 스타일 점검
  return <p className={cn('text-sm/[1.7] text-gray-800', className)}>{children}</p>;
};

export default Text;

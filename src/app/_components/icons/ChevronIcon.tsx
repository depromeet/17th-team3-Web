import { SVGProps } from 'react';

type ChevronIconProps = SVGProps<SVGSVGElement> & {
  direction: 'left' | 'right' | 'up' | 'down';
};

const ChevronIcon = ({ direction, ...props }: ChevronIconProps) => {
  const getRotation = () => {
    switch (direction) {
      case 'left':
        return 'rotate(0deg)';
      case 'down':
        return 'rotate(270deg)';
      case 'up':
        return 'rotate(90deg)';
      default:
        return 'rotate(180deg)';
    }
  };
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: getRotation() }}
      {...props}
    >
      <g clipPath="url(#clip0_19_18894)">
        <path
          d="M22.5 9L13.5 18L22.5 27"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_19_18894">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ChevronIcon;

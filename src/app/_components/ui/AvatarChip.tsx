import { HTMLAttributes } from 'react';

import Image from 'next/image';

import MarqueeText from '@/app/_features/MarqueeText';
import { cn } from '@/app/_lib/cn';
import { AvatarVariantKey } from '@/app/_models/avator';

const IMAGE_PATH = '/images/avatar';
const BOX_SHADOW = '0 4px 12px 0 rgba(250, 165, 148, 0.50)';

type AvatarVariantMeta = { bg: string; iconSrc: string };

const AVATAR_VARIANTS: Record<AvatarVariantKey | 'empty', AvatarVariantMeta> = {
  default: {
    bg: 'bg-yellow-400',
    iconSrc: `${IMAGE_PATH}/default.svg`,
  },
  strawberry: {
    bg: 'bg-[#FFBDBF]',
    iconSrc: `${IMAGE_PATH}/strawberry.svg`,
  },
  matcha: {
    bg: 'bg-[#6ADE81]',
    iconSrc: `${IMAGE_PATH}/matcha.svg`,
  },
  orange: {
    bg: 'bg-orange-300',
    iconSrc: `${IMAGE_PATH}/orange.svg`,
  },
  grape: {
    bg: 'bg-[#D3A2F1]',
    iconSrc: `${IMAGE_PATH}/grape.svg`,
  },
  chocolate: {
    bg: 'bg-[#9B7E6B]',
    iconSrc: `${IMAGE_PATH}/chocolate.svg`,
  },
  milk: {
    bg: 'bg-[#D7ECFF]',
    iconSrc: `${IMAGE_PATH}/milk.svg`,
  },
  empty: {
    bg: 'bg-neutral-200',
    iconSrc: `${IMAGE_PATH}/empty.svg`,
  },
} as const;

type EmptyCase =
  | {
      variant: 'empty';
      name?: never;
      isMarquee?: never;
    }
  | {
      variant: AvatarVariantKey;
      name: string;
      isMarquee?: boolean;
    };

type AvatarChipProps = HTMLAttributes<HTMLDivElement> & {
  variant: AvatarVariantKey | 'empty';
  name?: string;
  isMarquee?: boolean;
} & EmptyCase;

const AvatarChip = ({ variant, name, isMarquee, className, ...props }: AvatarChipProps) => {
  if (variant === 'empty') {
    return (
      <div
        className={cn(
          'user-select:none flex h-24 w-19 shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-neutral-300 transition-all duration-200',
          AVATAR_VARIANTS[variant].bg,
          className
        )}
        style={{
          boxShadow: BOX_SHADOW,
        }}
        {...props}
      >
        <Image
          src={AVATAR_VARIANTS[variant].iconSrc}
          alt={variant}
          width={44}
          height={44}
          className="h-11 w-11"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'user-select:none flex h-24 w-19 shrink-0 flex-col items-center justify-center gap-1 rounded-xl px-1 pt-2 pb-4 body-3 font-semibold text-orange-900 transition-all duration-200',
        AVATAR_VARIANTS[variant].bg,
        className
      )}
      style={{
        boxShadow: BOX_SHADOW,
      }}
      {...props}
    >
      <div className="flex flex-1 items-center justify-center">
        <Image
          src={AVATAR_VARIANTS[variant].iconSrc}
          alt={variant}
          width={48}
          height={48}
          className="h-12 w-12"
        />
      </div>
      {isMarquee ? (
        <MarqueeText className="text-center">{name}</MarqueeText>
      ) : (
        <span className="line-clamp-1">{name}</span>
      )}
    </div>
  );
};

export default AvatarChip;

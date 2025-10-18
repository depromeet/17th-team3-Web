import Image from 'next/image';

import { cn } from '@/app/_lib/cn';
import { AvatarVariantKey } from '@/app/_models/avator';

const IMAGE_PATH = '/images/avatar';

type AvatarVariantMeta = { bg: string; iconSrc: string };

const AVATAR_VARIANTS: Record<AvatarVariantKey, AvatarVariantMeta> = {
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
  mint: {
    bg: 'bg-[#ABEBE2]',
    iconSrc: `${IMAGE_PATH}/mint.svg`,
  },
  sweetPotato: {
    bg: 'bg-[#AC7E94]',
    iconSrc: `${IMAGE_PATH}/sweetPotato.svg`,
  },
  pistachio: {
    bg: 'bg-[#A8D39E]',
    iconSrc: `${IMAGE_PATH}/pistachio.svg`,
  },
} as const;

type AvatorIconProps = {
  variant: AvatarVariantKey;
  className?: string;
};

/**
 *
 * @param variant - 아바타 변경
 * @param className - 추가 클래스 이름
 * @description - 기본 크기는 48px * 48px 입니다.
 * @description - 컴포넌트 크기는 80px을 넘어갈 경우 아이콘 해상도가 낮아집니다.
 */
const AvatarIcon = ({ variant, className }: AvatorIconProps) => {
  const iconSrc = AVATAR_VARIANTS[variant];
  return (
    <div
      className={cn('flex h-12 w-12 items-center justify-center rounded-xl', iconSrc.bg, className)}
    >
      <div className="relative h-2/3 w-2/3">
        <Image src={iconSrc.iconSrc} alt={variant} sizes="60px" fill className="object-contain" />
      </div>
    </div>
  );
};

export default AvatarIcon;

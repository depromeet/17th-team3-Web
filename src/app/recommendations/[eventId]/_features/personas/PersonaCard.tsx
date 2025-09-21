import Image from 'next/image';

import { FOOD_MAP, FoodKey } from '@/app/_constants/menu';
import { cn } from '@/app/_lib/cn';
import { Attendee } from '@/app/recommendations/[eventId]/_mock/attendee.types';

/**
 * 참석자의 선호도 정보를 보여주는 카드 컴포넌트의 Props
 */
interface PersonaCardProps {
  /** 참석자의 순서 (0부터 시작) */
  attendeeIndex: number;
  /** 전체 참석자 수 */
  totalAttendeesCount: number;
  /** 참석자 데이터 */
  attendeeData: Attendee;
  /** 카드 element ref */
  cardRef?: React.RefCallback<HTMLDivElement | null>;
  /** data-id 속성 */
  'data-id'?: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 음식 카테고리를 나타내는 칩 컴포넌트
 * @param food 음식 카테고리 키
 */
const FoodCategoryChip = ({ foodCategory }: { foodCategory: FoodKey }) => {
  return (
    <div className="flex shrink-0 flex-row gap-1 rounded-lg bg-neutral-200 px-3 py-1">
      <Image
        src={FOOD_MAP[foodCategory].imageSrc}
        alt={`${FOOD_MAP[foodCategory].name} 아이콘`}
        width={20}
        height={20}
        className="h-5 w-5"
      />
      <span className="label-1 font-semibold text-orange-900">{FOOD_MAP[foodCategory].name}</span>
    </div>
  );
};

/**
 * 참석자의 선호도 정보를 보여주는 카드 컴포넌트
 */
const PersonaCard = ({
  attendeeIndex,
  totalAttendeesCount,
  attendeeData,
  cardRef,
  'data-id': dataId,
  className,
}: PersonaCardProps) => {
  return (
    <div
      ref={cardRef}
      data-id={dataId}
      className={cn(
        'flex w-11/12 shrink-0 flex-col gap-7 rounded-[1.25rem] bg-white px-5 py-6',
        className
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-row gap-0.5 rounded-sm bg-neutral-200 px-2 py-1.5 subheading-2 font-bold">
          <span className="text-orange-900">{attendeeIndex + 1}</span>
          <span className="text-neutral-700">/</span>
          <span className="text-neutral-700">{totalAttendeesCount}</span>
        </div>
        <div className="flex flex-row">
          <span className="body-1 font-semibold text-orange-900">{attendeeData.name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="body-3 font-semibold text-orange-900">선호하는 음식</span>
          <div className="flex flex-row flex-wrap gap-3">
            {attendeeData.preferredFoods.map((foodCategory) => (
              <FoodCategoryChip key={foodCategory} foodCategory={foodCategory} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="body-3 font-semibold text-orange-900">못 먹는 것</span>
          <div className="flex flex-row flex-wrap gap-3">
            {attendeeData.avoidedFoods.map((foodCategory) => (
              <FoodCategoryChip key={foodCategory} foodCategory={foodCategory} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;

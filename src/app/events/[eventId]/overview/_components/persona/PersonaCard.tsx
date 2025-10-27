'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import AvatarIcon from '@/app/_components/ui/AvatarIcon';
import { getCuisineImageSrc } from '@/app/_constants/cuisine';
import { Cuisine, Survey } from '@/app/_services/overview';

interface PersonaCardProps {
  survey: Survey;
}

const CuisinePreferenceRow = ({ cuisine }: { cuisine: Cuisine }) => {
  return (
    <div className="flex flex-row items-start justify-between gap-2">
      <div className="mt-0.5 flex shrink-0 items-center gap-2">
        <Image
          src={getCuisineImageSrc(cuisine.id)}
          alt={`${cuisine.name} 아이콘`}
          width={20}
          height={20}
          className="h-5 w-5"
        />
        <span className="type-gradient label-1 font-semibold">{cuisine.name}</span>
      </div>
      <div className="flex max-w-[70%] flex-wrap justify-end gap-1">
        {cuisine.menuList.map((menu) => (
          <div
            key={menu.id}
            className="flex items-center rounded-[2.5rem] bg-neutral-1400/[0.06] px-3 py-1"
          >
            <span className="label-1 font-semibold text-neutral-1400">{menu.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// -------------------------------------------- PersonaCard --------------------------------------------
const PersonaCard = ({ survey }: PersonaCardProps) => {
  return (
    <div
      data-id={survey.participantId}
      className="flex w-full flex-col gap-6 rounded-[1.25rem] bg-white p-5"
    >
      <div className="flex items-center gap-3">
        <AvatarIcon variant={survey.avatarColor} className="shrink-0" />
        <span className="line-clamp-1 subheading-1 font-bold text-neutral-1600">
          {survey.nickname}
        </span>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto">
        {survey.selectedCategoryList.map((cuisine) => (
          <CuisinePreferenceRow key={cuisine.id} cuisine={cuisine} />
        ))}
      </div>

      <button
        type="button"
        className="mt-auto flex items-center justify-center gap-2 rounded-[0.625rem] border border-orange-300 bg-orange-100 px-5 py-3 label-1 font-semibold text-orange-600"
      >
        자세히 보기 <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} absoluteStrokeWidth />
      </button>
    </div>
  );
};

export default PersonaCard;

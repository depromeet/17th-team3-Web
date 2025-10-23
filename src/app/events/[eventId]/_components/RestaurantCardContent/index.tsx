import { Heart, MapPin, Send, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { cn } from '@/app/_lib/cn';
import { RecommendedPlace } from '@/app/_services/places';
import { CARD_UI } from '@/app/events/[eventId]/_components/RestaurantCardContent/restaurantCardThemes';
import RestaurantImageGallery from '@/app/events/[eventId]/_components/RestaurantCardContent/RestaurantImageGallery';

interface RestaurantCardContentProps {
  place: RecommendedPlace;
  theme: 'lightCompact' | 'heroDark';
  imagePriority: boolean;
  imageIndex?: number;
  handleImageChange?: (index: number) => void;
  className?: string;
}

const RestaurantCardContent = ({
  place,
  imageIndex,
  handleImageChange,
  theme,
  imagePriority,
  className,
}: RestaurantCardContentProps) => {
  const router = useRouter();

  const ui = CARD_UI[theme]; //ui는 CARD_UI에 정의된 테마 클래스 이름들을 가져옴

  return (
    <div className={cn('flex flex-col', ui.root, className)}>
      {theme === 'lightCompact' && (
        <RestaurantImageGallery
          images={place.photos}
          containerClassName={ui.gallery}
          imageClassName={ui.galleryImage}
          isScrollable={true}
          imagePriority={imagePriority}
        />
      )}
      <div className="mb-1 flex w-full items-center justify-between gap-4">
        <span className={ui.title}>{place.name}</span>
        <button type="button" className="pl-2">
          <Send className={ui.sendIcon} />
        </button>
      </div>

      <div className="flex w-full items-center gap-4">
        <div className="flex shrink-0 items-center gap-1">
          <Star
            size={16}
            fill="currentColor"
            strokeWidth={1.5}
            absoluteStrokeWidth
            className={ui.metaIcon}
          />
          <span className={cn('label-2 font-medium', ui.metaText)}>
            {place.rating} ({place.userRatingsTotal})
          </span>
        </div>
        <div className="flex flex-grow items-center gap-1">
          <MapPin size={16} strokeWidth={1.5} absoluteStrokeWidth className={ui.metaIcon} />
          <span className={cn('line-clamp-1 label-2 font-medium', ui.metaText)}>
            {place.addressDescriptor?.description || place.address || '위치 정보 없음'}
          </span>
        </div>
      </div>

      <div className={cn('w-full rounded-lg px-3 py-2', ui.reviewBox)}>
        <span className={cn('center line-clamp-2 label-2 font-medium', ui.reviewText)}>
          {place.topReview?.text || ''}
        </span>
      </div>
      {theme === 'heroDark' && (
        <RestaurantImageGallery
          images={place.photos}
          activeIndex={imageIndex || 0}
          onImageChange={handleImageChange}
          containerClassName={ui.gallery}
          imageClassName={ui.galleryImage}
          imagePriority={imagePriority}
        />
      )}

      <div className={cn('flex items-center gap-4', ui.buttonContainer)}>
        <button
          type="button"
          className={cn(
            'h-12 items-center justify-center rounded-[0.625rem] px-5 label-1 font-semibold',
            ui.addrButton
          )}
          onClick={() => {
            router.push(place.link);
          }}
        >
          <span className={ui.addrText}>지도에서 보기</span>
        </button>
        <button
          type="button"
          className={cn(
            'flex h-12 flex-1 shrink-0 items-center justify-center gap-3 rounded-[0.625rem] font-semibold',
            ui.wishButton
          )}
          onClick={() => {
            // TODO: 구현 필요 - 장소 공유 기능
          }}
        >
          <span className={cn('label-1 font-bold', ui.wishCount)}>{place.likeCount}</span>
          <span className="label-1 font-semibold text-white">가고 싶어요</span>
          <Heart size={24} strokeWidth={1.5} absoluteStrokeWidth className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default RestaurantCardContent;

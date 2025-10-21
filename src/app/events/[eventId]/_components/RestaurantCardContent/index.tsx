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

  const themeClass = CARD_UI[theme].root;

  return (
    <div className={cn('flex flex-col', themeClass, className)}>
      {theme === 'lightCompact' && (
        <RestaurantImageGallery
          images={place.photos}
          activeIndex={imageIndex || 0}
          onImageChange={handleImageChange || (() => {})}
          containerClassName={CARD_UI[theme].gallery}
          imageClassName={CARD_UI[theme].galleryImage}
          isScrollable={true}
          imagePriority={imagePriority}
        />
      )}
      <div className="mb-1 flex w-full items-center justify-between gap-4">
        <span className={CARD_UI[theme].title}>{place.name}</span>
        <button type="button" className="pl-2">
          <Send className={CARD_UI[theme].sendIcon} />
        </button>
      </div>

      <div className="flex w-full items-center gap-4">
        <div className="flex shrink-0 items-center gap-1">
          <Star
            size={16}
            fill="currentColor"
            strokeWidth={1.5}
            absoluteStrokeWidth
            className={CARD_UI[theme].metaIcon}
          />
          <span className={cn('label-2 font-medium', CARD_UI[theme].metaText)}>
            {place.rating} ({place.userRatingsTotal})
          </span>
        </div>
        <div className="flex flex-grow items-center gap-1">
          <MapPin
            size={16}
            strokeWidth={1.5}
            absoluteStrokeWidth
            className={CARD_UI[theme].metaIcon}
          />
          <span className={cn('line-clamp-1 label-2 font-medium', CARD_UI[theme].metaText)}>
            {place.addressDescriptor?.description || place.address || '위치 정보 없음'}
          </span>
        </div>
      </div>

      <div className={cn('w-full rounded-lg px-3 py-2', CARD_UI[theme].reviewBox)}>
        <span className={cn('center line-clamp-2 label-2 font-medium', CARD_UI[theme].reviewText)}>
          {place.topReview?.text || ''}
        </span>
      </div>
      {theme === 'heroDark' && (
        <RestaurantImageGallery
          images={place.photos}
          activeIndex={imageIndex || 0}
          onImageChange={handleImageChange || (() => {})}
          containerClassName={CARD_UI[theme].gallery}
          imageClassName={CARD_UI[theme].galleryImage}
          imagePriority={imagePriority}
        />
      )}

      <div className={cn('flex items-center gap-4', CARD_UI[theme].buttonContainer)}>
        <button
          type="button"
          className={cn(
            'h-12 items-center justify-center rounded-[0.625rem] px-5 label-1 font-semibold',
            CARD_UI[theme].addrButton
          )}
          onClick={() => {
            router.push(place.link);
          }}
        >
          <span className={CARD_UI[theme].addrText}>지도에서 보기</span>
        </button>
        <button
          type="button"
          className={cn(
            'flex h-12 flex-1 shrink-0 items-center justify-center gap-3 rounded-[0.625rem] font-semibold',
            CARD_UI[theme].wishButton
          )}
        >
          <span className={cn('label-1 font-bold', CARD_UI[theme].wishCount)}>
            {place.likeCount}
          </span>
          <span className="label-1 font-semibold text-white">가고 싶어요</span>
          <Heart size={24} strokeWidth={1.5} absoluteStrokeWidth className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default RestaurantCardContent;

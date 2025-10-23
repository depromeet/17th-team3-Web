import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

import { cn } from '@/app/_lib/cn';

interface RestaurantImageGalleryProps {
  images: string[];
  activeIndex?: number;
  containerClassName?: string;
  imageClassName?: string;
  isScrollable?: boolean;
  imagePriority?: boolean;
  onImageChange?: (index: number) => void;
}

const RestaurantImageGallery = ({
  images,
  activeIndex,
  containerClassName,
  imageClassName,
  imagePriority = false,
  isScrollable = false,

  onImageChange,
}: RestaurantImageGalleryProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: isScrollable ? 'keepSnaps' : 'trimSnaps',
    watchDrag: isScrollable,
  });

  const onClickImage = (index: number) => {
    onImageChange?.(index);
    emblaApi?.scrollTo(index);
  };

  return (
    <div
      className="w-full touch-pan-y overflow-hidden overscroll-contain"
      role="presentation"
      ref={emblaRef}
    >
      <div className={cn('flex gap-3', containerClassName)}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onClickImage(index)}
            className={cn(
              'relative h-15 w-15 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-transparent transition-all duration-300',
              activeIndex === index && 'border-white',
              imageClassName
            )}
          >
            <Image
              src={image}
              fill
              sizes="100px"
              alt={`사진 ${index + 1}`}
              priority={imagePriority}
              blurDataURL={'/images/backgroundImage.png'}
              placeholder="blur"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RestaurantImageGallery;

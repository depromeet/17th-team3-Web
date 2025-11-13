'use client';
import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import { RecommendedPlace } from '@/app/_services/place';
import PickRankBadge from '@/app/events/[eventId]/_components/PickRankBadge';
import RestaurantCardContent from '@/app/events/[eventId]/_components/RestaurantCardContent';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1080&q=80';

interface RestaurantCardProps {
  place: RecommendedPlace;
  index: number;
  isActive: boolean;
}

const RestaurantCard = ({ place, index, isActive }: RestaurantCardProps) => {
  const [image, setImage] = useState(place.photos?.[0]);
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageChange = (index: number) => {
    setImage(place.photos?.[index] || DEFAULT_IMAGE);
    setImageIndex(index);
  };

  return (
    <div
      className="flex h-full w-full flex-col rounded-4xl p-[0.0625rem]"
      style={{
        boxShadow: '0 0 24px 0 rgba(0, 0, 0, 0.12)',
        background:
          'linear-gradient(33deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.72) 100%)',
      }}
    >
      <section className="relative flex h-full w-full overflow-hidden rounded-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={image || place.photos?.[0]} // 이미지 URL을 key로
            initial={{ opacity: imageIndex === 0 ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={image || place.photos?.[0]} //하이라이트 처리를 위해 첫 번째 이미지를 사용
              alt={place.name}
              fill
              className="z-10 object-cover"
              priority={index === 0 || index === 1}
              sizes="700px"
            />
          </motion.div>
        </AnimatePresence>

        {index === 0 && <PickRankBadge className="absolute top-6 left-0 z-20" rank={index + 1} />}
        <div
          className="z-20 mt-auto w-full px-4 pt-9 pb-5"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.64) 20.67%)',
            minHeight: '240px',
          }}
        >
          <motion.div
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 20,
            }}
            initial={
              index === 0
                ? { opacity: 1, y: 0 } // 첫 카드는 초기에 바로 보임
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
            style={{
              pointerEvents: isActive ? 'auto' : 'none', // 비활성 시 클릭 방지
            }}
          >
            <RestaurantCardContent
              place={place}
              imageIndex={imageIndex}
              handleImageChange={handleImageChange}
              theme="heroDark"
              imagePriority={index < 2}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantCard;

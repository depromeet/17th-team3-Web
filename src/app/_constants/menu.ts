const IMAGE_PATH = '/images/menu';

export const FOOD_MAP_CONSTANT = {
  korean: { name: '한식', imageSrc: `${IMAGE_PATH}/한식.svg` },
  chinese: { name: '중식', imageSrc: `${IMAGE_PATH}/중식.svg` },
  western: { name: '양식', imageSrc: `${IMAGE_PATH}/양식.svg` },
  japanese: { name: '일식', imageSrc: `${IMAGE_PATH}/일식.svg` },
  southeast: { name: '동남아 음식', imageSrc: `${IMAGE_PATH}/태국 음식.svg` },
} as const;

export type FoodKey = keyof typeof FOOD_MAP_CONSTANT;
export type FoodMeta = (typeof FOOD_MAP_CONSTANT)[FoodKey];
export const FOOD_MAP: Record<FoodKey, FoodMeta> = FOOD_MAP_CONSTANT;

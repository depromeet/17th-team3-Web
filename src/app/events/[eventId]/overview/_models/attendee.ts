import { FoodKey } from '@/app/_constants/menu';
import { AvatarVariantKey } from '@/app/_models/avator';

/**
 * 참석자 개인 정보 및 음식 선호도를 나타내는 타입
 */
export interface Attendee {
  /** 참석자 고유 식별자 */
  id: string;
  /** 참석자 이름 */
  name: string;
  /** 참석자 아바타 이모지 */
  avatar: string;
  /** 선호하는 음식 카테고리 목록 */
  preferredFoods: FoodKey[];
  /** 먹지 못하는 음식 카테고리 목록 */
  avoidedFoods: FoodKey[];
  /** 아바타 테마 키 */
  avatarThemeKey: AvatarVariantKey;
}

/**
 * 참석자 데이터 집합을 나타내는 타입
 */
export interface AttendeesData {
  /** 전체 참석자 수 */
  totalAttendees: number;
  /** 아직 선택하지 않은 참석자 수 */
  notYetSelectedAttendees: number;
  /** 참석자 목록 */
  attendees: Attendee[];
}

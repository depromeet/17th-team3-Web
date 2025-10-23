import { api } from '@/app/_lib/api';

export interface RecommendedPlace {
  placeId: number; // 장소 ID
  name: string; // 장소 이름
  address: string; // 주소
  rating: number; // 평점
  userRatingsTotal: number; // 리뷰 수
  openNow?: boolean; // 현재 영업 중인지
  photos: string[]; // 사진
  link: string; // 바로가기 링크
  weekdayText?: string[]; // 요일별 영업 시간
  topReview?: {
    rating: number; // 평점
    text: string; // 리뷰 내용
  };
  priceRange?: string; // 가격대
  addressDescriptor?: {
    description: string;
  };
  likeCount: number;
  isLiked: number;
}

export interface RecommendedPlaceResponse {
  items: RecommendedPlace[];
}

export const getPlaces = async (keyword: string) => {
  const params = {
    query: keyword,
  };
  const response = await api.get<RecommendedPlaceResponse>('/places', {
    params,
  });
  return response;
};

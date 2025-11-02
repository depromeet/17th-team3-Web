/** 참가자 프로필 설정 응답 */
export interface ProfileResponse {
  attendeeNickname: string;
  color:
    | 'DEFAULT'
    | 'STRAWBERRY'
    | 'MATCHA'
    | 'ORANGE'
    | 'GRAPE'
    | 'CHOCOLATE'
    | 'MILK'
    | 'MINT'
    | 'SWEET_POTATO'
    | 'PISTACHIO'
    | string;
}

/** 음식 데이터 구조 */
export interface CuisineNode {
  id: number;
  level: 'BRANCH' | 'LEAF';
  name: string;
  sortOrder: number;
  children: CuisineNode[];
}

/** 음식 목록 API 응답 */
export interface CuisineResponse {
  data: CuisineNode[];
}

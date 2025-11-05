import { CuisineId } from '@/app/_constants/cuisine';
import overviewMockData from '@/app/_mocks/overview';
import { AvatarVariantKey } from '@/app/_models/avator';

export interface Menu {
  id: number;
  name: string;
}
export interface Cuisine {
  id: CuisineId;
  name: string;
  menuList: Menu[];
}

export interface Survey {
  participantId: number;
  nickname: string;
  avatarColor: AvatarVariantKey;
  selectedCategoryList: Cuisine[];
}
export interface Overview {
  surveys: Survey[];
  totalAttendees: number;
  notYetParticipationAttendees: number;
  isMyParticipation: boolean;
  endAt: string;
}

export const getMockOverview = async (_eventId: string): Promise<Overview> => {
  return overviewMockData;
};

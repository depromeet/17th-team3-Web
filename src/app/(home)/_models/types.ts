export interface Meeting {
  id: number;
  name: string;
  hostUserId: number;
  attendeeCount: number;
  isClosed: boolean;
  stationName: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}

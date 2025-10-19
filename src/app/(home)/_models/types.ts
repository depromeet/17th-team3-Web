export interface Meeting {
  id: number;
  name: string;
  hostUserId: number;
  attendeeCount: number;
  isClosed: boolean;
  stationId: number;
  endAt: string;
  createdAt: string;
  updatedAt: string;
}

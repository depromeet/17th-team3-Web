import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getPlaces } from '@/app/_services/place';

export const placeQueryKeys = createQueryKeys('place', {
  getPlaces: (meetingId: number) => [meetingId],
});

export const getPlacesQueryOptions = (meetingId: number) => ({
  queryKey: placeQueryKeys.getPlaces(meetingId).queryKey,
  queryFn: () => getPlaces(meetingId),
});

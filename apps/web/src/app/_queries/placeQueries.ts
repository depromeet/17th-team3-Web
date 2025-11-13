import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getPlaces } from '@/app/_services/place';

export const placeQueryKeys = createQueryKeys('place', {
  getPlaces: (query: string) => [query],
});

export const getPlacesQueryOptions = (keyword: string) => ({
  queryKey: placeQueryKeys.getPlaces(keyword).queryKey,
  queryFn: () => getPlaces(keyword),
});

import { Heading } from '@/app/_components/typography';
import { getPlaces } from '@/app/_services/places';
import RestaurantsClient from '@/app/events/[eventId]/restaurants/RestaurantsClient';

interface RestaurantsPageProps {
  params: Promise<{ eventId: string }>;
}

const RestaurantsPage = async ({ params }: RestaurantsPageProps) => {
  const { eventId } = await params;

  const places = await getPlaces('강남역 한식 맛집');

  const restaurants = places.items;

  return (
    <div className="flex flex-1 flex-col">
      <Heading level="h3" as="h1" className="px-5 py-2 text-white">
        우리 모임이 Pick한 식당
      </Heading>
      <RestaurantsClient restaurants={restaurants} />
    </div>
  );
};

export default RestaurantsPage;

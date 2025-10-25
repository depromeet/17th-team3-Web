import Image from 'next/image';

import { Heading } from '@/app/_components/typography';
import { getMockAnalysis } from '@/app/_services/analysis';
import { getPlaces } from '@/app/_services/places';
import MorePicksButton from '@/app/events/[eventId]/_components/MorePicksButton';
import PieChart from '@/app/events/[eventId]/analysis/_components/PieChart';
import RestaurantCardSwiper from '@/app/events/[eventId]/analysis/_components/RestaurantCardSwiper';

interface AnalysisPageProps {
  params: Promise<{
    eventId: string;
  }>;
}

const AnalysisPage = async ({ params }: AnalysisPageProps) => {
  const { eventId } = await params;

  // 병렬로 데이터 가져오기
  const [analysisData, placesResponse] = await Promise.all([
    getMockAnalysis(eventId), // 나중에 getAnalysis(eventId)로 변경
    getPlaces('강남역 한식 맛집'),
  ]);

  const { items: places } = placesResponse;

  const preferredCuisinesChartData = analysisData.preferredCuisines.map((cuisine) => ({
    name: cuisine.name,
    value: cuisine.value,
  }));

  return (
    <div className="flex flex-1 flex-col">
      <Heading level="h2" as="h1" className="px-5 py-2 whitespace-pre-line text-white">
        {analysisData.summary}
      </Heading>
      <RestaurantCardSwiper places={places} />

      <div className="h-2 w-full bg-neutral-1500" />

      <div className="flex w-full flex-1 flex-col gap-9 px-5 py-[1.9375rem]">
        <Heading level="h2" className="whitespace-pre-line text-white">
          {'이번 모임에서의 주로\n 취향 설문 결과예요'}
        </Heading>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/images/avatar/orange.svg" alt="orange" width={24} height={24} />
            <span className="body-3 font-semibold text-neutral-400">선호하는 음식</span>
          </div>
          <PieChart data={preferredCuisinesChartData} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Image src="/images/avatar/default.svg" alt="default" width={24} height={24} />
            <span className="body-3 font-semibold text-neutral-400">선호하는 메뉴</span>
          </div>
        </div>
      </div>

      <MorePicksButton />
    </div>
  );
};

export default AnalysisPage;

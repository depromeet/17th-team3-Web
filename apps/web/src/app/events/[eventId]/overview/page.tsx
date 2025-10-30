import { getMockOverview } from '@/app/_services/overview';
import PersonaCardSwiper from '@/app/events/[eventId]/overview/_components/persona/PersonaCardSwiper';
import SurveyActionButton from '@/app/events/[eventId]/overview/_components/SurveyActionButton';
import SurveyStatusBanner from '@/app/events/[eventId]/overview/_components/SurveyStatusBanner';

//--------------------------------Page--------------------------------

interface OverviewPageProps {
  params: Promise<{ eventId: string }>;
}

const OverviewPage = async ({ params }: OverviewPageProps) => {
  const { eventId } = await params;

  const overviewData = await getMockOverview(eventId);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col items-center gap-6 px-5 py-4">
        <SurveyStatusBanner variant="progress" />
        {/* 하단 모임 참여 상태 공간 차지 */}
        <div className="h-[75px]" />
      </div>
      <div className="flex flex-1 flex-col">
        <PersonaCardSwiper overview={overviewData} />
      </div>
      <SurveyActionButton variant="join" />
    </div>
  );
};
export default OverviewPage;

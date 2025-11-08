'use client';

import { useEffect } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import CreateMeetingSuccessModal from '@/app/_components/ui/Modal/CreateMeetingSuccessModal';
import { useDisclosure } from '@/app/_hooks/useDisclosure';
import { Overview } from '@/app/_services/overview';
import PersonaCardSwiper from '@/app/events/[eventId]/overview/_components/persona/PersonaCardSwiper';
import SurveyActionButton from '@/app/events/[eventId]/overview/_components/SurveyActionButton';
import SurveyStatusBanner from '@/app/events/[eventId]/overview/_components/SurveyStatusBanner';

const OverviewClientPage = ({ overviewData }: { overviewData: Overview }) => {
  const { isOpen: modalOpen, handler: modalHandler } = useDisclosure();

  const router = useRouter();
  const { eventId } = useParams();
  const searchParam = useSearchParams();
  const created = searchParam.get('created');
  const token = searchParam.get('token');

  useEffect(() => {
    if (created) {
      modalHandler.open();
      router.replace(`/events/${eventId}/overview?token=${token}`);
    }
  }, []);

  return (
    <>
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
      <CreateMeetingSuccessModal isOpen={modalOpen} onClose={modalHandler.close} />
    </>
  );
};

export default OverviewClientPage;

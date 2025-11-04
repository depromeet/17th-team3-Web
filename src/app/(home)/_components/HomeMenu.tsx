'use client';

import { useRouter } from 'next/navigation';

import { ActionButton } from '@/app/(home)/_components';
import FloatingActionButton from '@/app/(home)/_components/FloatingActionButton';
import ComingSoonModal from '@/app/_components/ui/Modal/ComingSoonModal';
import { useDisclosure } from '@/app/_hooks/useDisclosure';

interface HomeMenuProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

const HomeMenu = ({ isOpen, onToggle }: HomeMenuProps) => {
  const { isOpen: showComingSoonMadal, handler: comingSoonModalHandler } = useDisclosure();

  const router = useRouter();

  const handleCreateMeeting = () => {
    router.push('/meetings/create');
    onToggle(false);
  };

  const handleComingSoon = () => {
    onToggle(false);
    comingSoonModalHandler.open();
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-9 bg-black/70" aria-hidden="true" />}
      {isOpen && (
        <div className="fixed right-5 bottom-30 z-99 flex flex-col items-end gap-4">
          <ActionButton
            icon="/icons/people.svg"
            label="모임 생성하기"
            onClick={handleCreateMeeting}
          />
          <ActionButton
            icon="/icons/green-arrow.svg"
            label="초대받은 모임 참여하기"
            onClick={handleComingSoon}
          />
          <ActionButton
            icon="/icons/arrow.svg"
            label="내 취향으로 추천 받기"
            onClick={handleComingSoon}
          />
        </div>
      )}
      <FloatingActionButton isOpen={isOpen} onClick={() => onToggle(!isOpen)} />
      <ComingSoonModal isOpen={showComingSoonMadal} onClose={comingSoonModalHandler.close} />
    </>
  );
};

export default HomeMenu;

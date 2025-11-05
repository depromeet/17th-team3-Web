'use client';

import { useRouter } from 'next/navigation';

import { ActionButton } from '@/app/(home)/_components';
import FloatingActionButton from '@/app/(home)/_components/FloatingActionButton';
import { useToast } from '@/app/_features/toast';

interface HomeMenuProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

const HomeMenu = ({ isOpen, onToggle }: HomeMenuProps) => {
  const router = useRouter();
  const { success: toast } = useToast();

  const handleCreateMeeting = () => {
    router.push('/meetings/create');
    onToggle(false);
  };

  const handleComingSoon = () => {
    toast('아직 준비 중인 기능이에요!', { preventDuplicate: true, position: 'top' });
    onToggle(false);
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
    </>
  );
};

export default HomeMenu;

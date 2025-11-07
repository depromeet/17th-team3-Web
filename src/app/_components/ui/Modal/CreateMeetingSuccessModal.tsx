import { Copy } from 'lucide-react';
import Image from 'next/image';

import BaseModal from '@/app/_components/ui/Modal/BaseModal';

interface CreateMeetingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateMeetingSuccessModal = ({ isOpen, onClose }: CreateMeetingSuccessModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} showCloseButton className="max-w-[335px] pt-4">
      <div className="flex flex-col items-center pb-13 select-none">
        <Image src="/images/confetti.svg" alt="폭죽 아이콘" width={100} height={100} />
        <div className="flex flex-col items-center gap-2 pt-1 pb-2">
          <h3 className="title-gradient heading-3 font-bold">모임이 생성되었어요!</h3>
          <p className="text-center body-3 whitespace-pre-wrap text-neutral-800">
            {`더 많은 멤버가 취향 설문에 참여하도록\n지금 링크를 공유해보세요!`}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-3 px-4 py-3">
            <Image src="/icons/kakaotalk.svg" alt="카카오톡 아이콘" width={52} height={52} />
            <div className="label-1 text-neutral-1000">카카오톡</div>
          </div>
          <div className="flex flex-col gap-3 px-4 py-3">
            <div className="flex h-13 w-13 items-center justify-center rounded-full bg-neutral-200">
              <Copy size={27} className="text-neutral-1300" />
            </div>
            <div className="label-1 text-neutral-1000">URL 복사</div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default CreateMeetingSuccessModal;

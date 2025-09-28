'use client';

import { useState } from 'react';

import { Copy, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import BottomSheet from '@/app/_components/ui/BottomSheet';
import Button from '@/app/_components/ui/Button';
import { useToast } from '@/app/_features/toast';
import { useCopyToClipboard } from '@/app/_hooks/useCopyToClipboard';
import { exhaustiveCheck } from '@/app/_utils/typeGuards';
import { SHARE_OPTIONS } from '@/app/meetings/create/_models/constants';
import { ShareType } from '@/app/meetings/create/_models/types';
import ResultCard from '@/app/survey/_components/ResultCard';

// URL에서 모임 URL 갖고 오기
// const CreateSuccessPage = ({ ... }) => {
const CreateSuccessPage = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const { success: successToast } = useToast();

  const router = useRouter();

  const { copy } = useCopyToClipboard();

  const handleUrlCopy = () => {
    copy('momuzzi.site/meetings/sAmCHo'); // todo: meetingId로 교체
    successToast('참여 링크가 복사되었어요.\n 공유해서 참여를 독촉해보세요.', {
      preventDuplicate: true,
      position: 'top',
    });
  };

  const toggleBottomSheet = () => {
    setShowBottomSheet((prev) => !prev);
  };

  const handleShareButtonClick = (shareType: ShareType) => {
    switch (shareType) {
      case 'url':
        handleUrlCopy();
        break;
      case 'kakao':
        successToast('카카오톡 공유 준비중!', {
          preventDuplicate: true,
          position: 'top',
        });
        // todo: 카카오톡 공유
        // shareToKakaoTalk()
        break;
      case 'sms':
        successToast('SMS 공유 준비중!', {
          preventDuplicate: true,
          position: 'top',
        });
        // todo: SMS 방법 무엇일까? 템플릿 클립보드 복사일까?
        // shareViaSms()
        break;
      default:
        exhaustiveCheck(shareType);
    }
  };

  return (
    <div className="relative flex h-[100dvh] flex-col p-4">
      <div className="w-full">
        <X
          onClick={() => router.push('/meetings/sAmCHo')}
          size={32}
          className="ml-auto cursor-pointer text-orange-800"
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <ResultCard
          title="모임이 생성되었어요!"
          subtitle={`링크를 통해 모든 모임원이 취향 설문에 참여하면\n식당을 추천받을 수 있어요`}
          showConfetti
        />
        <div className="flex w-full justify-between border-b border-neutral-300 p-4">
          <p className="label-3 font-medium text-neutral-1300">momuzzi.site/meetings/sAmCHo</p>
          <Copy onClick={handleUrlCopy} size={20} className="text-orange-500" strokeWidth={2} />
        </div>
      </div>

      <div className="flex flex-col gap-3 px-1 pb-2">
        <Button onClick={toggleBottomSheet}>모임원에게 공유하기</Button>
        {/* todo: 라우터 URL 변경 필요 */}
        <Button theme="orange-light" onClick={() => router.push('/meetings/sAmCHo')}>
          내 취향 설문 시작하기
        </Button>
      </div>

      {showBottomSheet && (
        <BottomSheet title="공유하기" showCloseButton onClose={toggleBottomSheet}>
          <div className="flex flex-1 justify-around py-3">
            {SHARE_OPTIONS.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => handleShareButtonClick(option.id)}
                className="flex flex-col items-center justify-center gap-3"
              >
                <div className="overflow-hidden rounded-full">
                  <Image
                    src={`/images/avatar/chocolate.svg`}
                    alt="카카오톡 공유"
                    width={60}
                    height={60}
                    priority
                  />
                </div>
                <span className="font-semibold text-neutral-900">{option.label}</span>
              </button>
            ))}
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

export default CreateSuccessPage;

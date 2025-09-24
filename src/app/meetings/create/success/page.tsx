import { Copy, X } from 'lucide-react';

import Button from '@/app/_components/ui/Button';
import ResultCard from '@/app/survey/_components/ResultCard';

const CreateSuccessPage = () => {
  return (
    <div className="flex h-[100dvh] flex-col p-4">
      <div className="w-full">
        <X size={32} className="ml-auto text-orange-800" />
      </div>

      <div className="flex flex-1 flex-col items-center gap-8">
        <ResultCard
          title="모임이 생성되었어요!"
          subtitle={`링크를 통해 모든 모임원이 취향 설문에 참여하면\n식당을 추천받을 수 있어요`}
        />
        <div className="flex w-full justify-between border-b border-neutral-300 p-4">
          <p className="label-1 font-medium text-neutral-1300">
            URL 링크 노출 영역 URL 링크 노출 영역
          </p>
          <Copy size={20} className="text-orange-500" strokeWidth={2} />
        </div>
      </div>

      <div className="flex flex-col gap-3 px-1 pb-2">
        <Button>모임원에게 공유하기</Button>
        <Button theme="orange-light">내 취향 설문 시작하기</Button>
      </div>
    </div>
  );
};

export default CreateSuccessPage;

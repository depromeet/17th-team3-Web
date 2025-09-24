'use client';

import { useState } from 'react';

import { Copy, X } from 'lucide-react';

import Button from '@/app/_components/ui/Button';
import ResultCard from '@/app/survey/_components/ResultCard';

const SHARE_OPTIONS = [
  { id: 'kakao', label: '카카오톡' },
  { id: 'sms', label: 'SMS' },
  { id: 'url', label: 'URL 복사' },
];

// URL에서 모임 URL 갖고 오기
// const CreateSuccessPage = ({ ... }) => {
const CreateSuccessPage = () => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const toggleBottomSheet = () => {
    setShowBottomSheet((prev) => !prev);
  };

  const handleUrlCopyClick = async () => {
    // todo: URL 조건 처리
    if (typeof window === 'undefined') {
      return;
    }
    // todo: 모임 링크로 교체
    navigator.clipboard.writeText('bit.ly/hqKUS6Bo1gKgBQ47');
    // todo: 토스트 표시
  };

  const handleShareOption = (optionId: string) => {
    switch (optionId) {
      case 'url':
        handleUrlCopyClick();
        break;
      case 'kakao':
        // todo: 카카오톡 공유
        break;
      case 'sms':
        // todo: SMS은 무엇일까? 템플릿 클립보드 복사일까?
        break;
    }
    setShowBottomSheet(false);
  };

  return (
    <div className="relative flex h-[100dvh] flex-col p-4">
      <div className="w-full">
        <X size={32} className="ml-auto cursor-pointer text-orange-800" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <ResultCard
          title="모임이 생성되었어요!"
          subtitle={`링크를 통해 모든 모임원이 취향 설문에 참여하면\n식당을 추천받을 수 있어요`}
          showConfetti
        />
        <div className="flex w-full justify-between border-b border-neutral-300 p-4">
          <p className="label-1 font-medium text-neutral-1300">bit.ly/hqKUS6Bo1gKgBQ47</p>
          <Copy
            onClick={handleUrlCopyClick}
            size={20}
            className="text-orange-500"
            strokeWidth={2}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 px-1 pb-2">
        <Button onClick={toggleBottomSheet}>모임원에게 공유하기</Button>
        <Button theme="orange-light">내 취향 설문 시작하기</Button>
      </div>

      {showBottomSheet && (
        <div className="fixed inset-0 z-10 bg-black/40">
          <div className="absolute bottom-0 h-[198px] w-full rounded-t-2xl bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-neutral-1600">요청하기</p>
              <X onClick={toggleBottomSheet} size={24} className="cursor-pointer" />
            </div>

            <div className="flex justify-around">
              {SHARE_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => handleShareOption(option.id)}
                  className="flex flex-col items-center gap-3 p-2"
                >
                  <div className="h-15 w-15 rounded-full bg-neutral-300" />
                  <span className="text-sm text-neutral-800">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSuccessPage;

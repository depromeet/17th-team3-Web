'use client';

import { useState } from 'react';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import Button from '@/app/_components/ui/Button';
import Input from '@/app/_components/ui/Input';

const CreatePage = () => {
  const [name, setName] = useState('');

  return (
    <div className="flex h-[100dvh] flex-col bg-[url('/images/mobileBackground.svg')] bg-cover">
      <TopNavigation title="모임 만들기" showBackButton />
      {/* todo: StepIndicator 컴포넌트로 추가 */}
      <main className="flex flex-1 flex-col">
        <div className="px-4 pt-8 pb-4">
          <h1 className="heading-3 font-bold">모임 이름은 무엇인가요?</h1>
        </div>

        <div className="flex-1 px-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onClear={() => setName('')}
            placeholder="디프만 3팀"
            showClearButton
          />
        </div>

        <div className="flex gap-3 px-5 pt-3 pb-6">
          <Button theme="gray" className="w-[114px]">
            취소
          </Button>
          <Button status={name ? 'normal' : 'disabled'} className="flex-1">
            다음 단계로
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CreatePage;

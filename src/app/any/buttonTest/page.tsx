'use client';

import Button from '@/app/_components/ui/Button';

const ButtonTestPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <Button theme="cta-gradient">cta 버튼</Button>
      <Button theme="cta-gradient" status="disabled">
        cta 버튼
      </Button>
      <Button theme="orange">오렌지 버튼</Button>
      <Button theme="orange-light">밝은 오렌지 버튼</Button>
      <Button theme="gray">회색 버튼</Button>

      {/* HTML 속성 사용 */}
      <Button onClick={() => alert('클릭됨!')}>제출</Button>

      {/* 커스텀 스타일 */}
      <Button className="max-w-32 bg-blue-500 font-bold text-white shadow-lg active:bg-blue-600">
        커스텀
      </Button>
    </div>
  );
};

export default ButtonTestPage;

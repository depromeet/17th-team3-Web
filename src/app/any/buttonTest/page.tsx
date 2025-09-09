'use client';

import { Button } from '@/app/_components/ui/Button';

const ButtonTestPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
      {/* 기본 (theme: orange, status: normal) */}
      <Button>기본 버튼</Button>

      {/* 오렌지 + disabled */}
      <Button status="disabled">비활성 버튼</Button>

      {/* 회색 + normal */}
      <Button theme="gray">취소</Button>

      {/* 회색 + disabled */}
      <Button theme="gray" status="disabled">
        불가
      </Button>

      {/* submit 타입 버튼 */}
      <Button type="submit">제출</Button>

      {/* reset 타입 버튼 */}
      <Button type="reset">초기화</Button>

      {/* onClick 이벤트 */}
      <Button onClick={() => alert('클릭됨!')}>클릭</Button>

      {/* 커스텀 스타일 */}
      <Button className="mt-4 w-3xs bg-blue-500 font-bold text-black shadow-lg">커스텀</Button>
    </div>
  );
};

export default ButtonTestPage;

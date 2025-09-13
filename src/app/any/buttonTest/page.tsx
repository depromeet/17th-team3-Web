'use client';

import Button from '@/app/_components/ui/Button';

const ButtonTestPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
      {/* 기본 사용 */}
      <Button>기본 버튼</Button>

      {/* 테마 변경 */}
      <Button theme="gray">회색 버튼</Button>

      {/* 상태 변경 */}
      <Button status="disabled">비활성화</Button>

      {/* HTML 속성 사용 */}
      <Button type="submit" onClick={() => alert('클릭됨!')}>
        제출
      </Button>

      {/* 커스텀 스타일 */}
      <Button className="max-w-32 bg-blue-500 font-bold text-white shadow-lg active:bg-blue-600">
        커스텀
      </Button>
    </div>
  );
};

export default ButtonTestPage;

import Image from 'next/image';
import Link from 'next/link';

import Button from '@/app/_components/ui/Button';

const NotFoundPage = () => {
  return (
    <main className="flex h-[100dvh] flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <Image
          src="/images/momuzzi-not-found.svg"
          alt="모무찌 404 아이콘"
          width={180}
          height={120}
        />
        <div className="flex flex-col gap-1 text-center">
          <h3 className="body-1 font-semibold text-neutral-1600">
            원하시는 페이지를 찾을 수 없어요
          </h3>
          <p className="body-3 whitespace-pre text-neutral-800">
            {`찾으시는 페이지의 주소 혹은 이름이 변경되었거나,\n일시적으로 사용할 수 없는 상태에요.\n문제가 또 발생한다면, [이메일 주소]로 알려주세요.`}
          </p>
        </div>
      </div>
      <Link href="/" className="px-5 pt-3 pb-6">
        <Button>홈으로 가기</Button>
      </Link>
    </main>
  );
};

export default NotFoundPage;

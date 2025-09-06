import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="max-w-screen-sm p-6 mx-auto text-center">
      <h1 className="mb-2 text-2xl font-bold">페이지를 찾을 수 없어요</h1>
      <p className="mb-6 text-sm text-neutral-500">
        요청한 페이지가 존재하지 않거나 이동되었을 수 있어요.
      </p>
      <Link href="/" className="rounded-lg px-4 py-2 inline-block underline">
        홈으로 가기
      </Link>
    </main>
  );
};

export default NotFound;

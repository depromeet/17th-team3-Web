import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const HomePage = () => {
  const isPrimary = true;
  const isLarge = false;

  // clsx + twMerge 조합
  const buttonClass = twMerge(
    clsx(
      'rounded-lg px-4 py-2 font-medium transition',
      isPrimary
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      isLarge && 'text-lg py-3 px-6', // false면 빠짐
      'bg-black' // <- bg 충돌을 넣음 → twMerge가 최종 bg-black 중 마지막 걸 남김
    )
  );

  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <div className="rounded-md bg-black px-3 py-1 text-xs text-white">Tailwind OK</div>

      {/* clsx + twMerge 사용한 버튼 */}
      <button className={buttonClass}>Dynamic Button</button>

      <p className="text-sm text-neutral-600">375×668 해상도</p>
      <span className="text-lg text-purple-400">hello</span>
    </main>
  );
};

export default HomePage;

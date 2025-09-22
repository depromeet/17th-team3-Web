import { twMerge } from 'tailwind-merge';

import { cn } from '@/app/_lib/cn';

const HomePage = () => {
  const isPrimary = true;
  const isLarge = false;

  const buttonClass = twMerge(
    cn(
      'rounded-lg px-4 py-2 font-medium transition',
      isPrimary
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      isLarge && 'text-lg py-3 px-6',
      'bg-black' // 충돌 유도 → twMerge가 최종값으로 병합
    )
  );

  return (
    <main className="min-h-screen-safe flex flex-col items-center justify-center gap-4 bg-white p-4">
      <div className="rounded-md bg-black px-3 py-1 text-xs text-white">Tailwind OK</div>
      <button className={buttonClass}>Dynamic Button</button>
      <p className="text-sm text-neutral-600">375×668 해상도</p>
      <span className="text-lg text-purple-400">hello</span>
    </main>
  );
};

export default HomePage;

const HomePage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <div className="rounded-md bg-black px-3 py-1 text-xs text-white">Tailwind OK</div>
      <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:opacity-90">
        Call to Action
      </button>
      <p className="text-sm text-neutral-600">이 영역은 357×668 좌표계입니다.</p>
    </main>
  );
};

export default HomePage;

const HomePage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <div className="rounded-md bg-black px-3 py-1 text-xs text-white">Tailwind OK</div>
      <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:opacity-90">
        Call to Action
      </button>
      <p className="text-sm text-neutral-600">357×668 해상도</p>
      <span className="text-lg text-purple-400">hello</span>
    </main>
  );
};

export default HomePage;

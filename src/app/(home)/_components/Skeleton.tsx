const Skeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-5 py-7">
      <div
        className="bg-skeleton-gradient h-6 w-1/2 animate-pulse rounded-[20px]"
        aria-hidden="true"
      />
      <div
        className="bg-skeleton-gradient h-39 w-full animate-pulse rounded-3xl"
        aria-hidden="true"
      />
    </div>
  );
};

export default Skeleton;

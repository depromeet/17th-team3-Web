'use client';

const StepProgress = ({ value }: { value: number }) => {
  return (
    <div className="mx-auto mb-3 w-full max-w-[480px] px-4">
      <div className="h-1.5 w-full rounded-full bg-gray-100">
        <div
          className="h-1.5 rounded-full bg-blue-600 transition-all"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          role="progressbar"
        />
      </div>
    </div>
  );
};

export default StepProgress;

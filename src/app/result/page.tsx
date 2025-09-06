import ResultCard from '@/app/_components/ui/ResultCard';

const page = () => {
  return (
    <div className="p-4">
      <ResultCard
        title="식당 3개가 선정됐어요"
        subtitle="모든 멤버가 참여 완료해 식당이 선정됐어요."
        showConfetti
      />
    </div>
  );
};

export default page;

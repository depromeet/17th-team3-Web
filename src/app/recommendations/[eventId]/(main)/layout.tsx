import TopNavigation from '@/app/_components/layout/TopNavigation';

interface RecommendationsLayoutProps {
  children: React.ReactNode;
}
const RecommendationsLayout = ({ children }: RecommendationsLayoutProps) => {
  return (
    <div
      className="flex flex-1 flex-col"
      style={{
        background:
          'linear-gradient(180deg, var(--Saturated-Orange-Orange100, #FFF0EB) 15.04%, var(--Saturated-Orange-Orange200, #FFD1C2) 53.66%)',
      }}
    >
      <TopNavigation title="" showBackButton />
      {children}
    </div>
  );
};

export default RecommendationsLayout;

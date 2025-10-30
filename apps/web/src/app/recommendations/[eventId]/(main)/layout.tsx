import TopNavigation from '@/app/_components/layout/TopNavigation';

interface RecommendationsLayoutProps {
  children: React.ReactNode;
}
const RecommendationsLayout = ({ children }: RecommendationsLayoutProps) => {
  return (
    <div className="flex flex-1 flex-col background-2">
      <TopNavigation title="" showBackButton />
      {children}
    </div>
  );
};

export default RecommendationsLayout;

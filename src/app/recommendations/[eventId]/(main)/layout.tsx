import TopNavigation from '@/app/_components/layout/TopNavigation';

interface RecommendationsLayoutProps {
  children: React.ReactNode;
}
const RecommendationsLayout = ({ children }: RecommendationsLayoutProps) => {
  return (
    <div className="flex flex-1 flex-col background-2">
      <TopNavigation title="" showBackButton className="text-orange-800" />
      {children}
    </div>
  );
};

export default RecommendationsLayout;

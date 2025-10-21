import TopNavigation from '@/app/_components/layout/TopNavigation';

interface OverviewLayoutProps {
  children: React.ReactNode;
}
const OverviewLayout = ({ children }: OverviewLayoutProps) => {
  return (
    <div className="flex flex-1 flex-col background-2">
      <TopNavigation title="" showBackButton />
      {children}
    </div>
  );
};

export default OverviewLayout;

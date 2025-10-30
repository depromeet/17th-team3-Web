import TopNavigation from '@/app/_components/layout/TopNavigation';

const AnalysisLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col bg-neutral-1600">
      <TopNavigation showBackButton className="text-white" />
      {children}
    </div>
  );
};

export default AnalysisLayout;

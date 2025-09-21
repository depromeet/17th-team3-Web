import { TitleGroup } from '@/app/_components/typography';
import Button from '@/app/_components/ui/Button';

interface StepFormLayoutrProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onNext: () => void;
  onCancel: () => void;
  isNextDisabled?: boolean;
  prevButtonText?: string;
  nextButtonText?: string;
}

const StepFormLayout = ({
  title,
  description,
  children,
  onNext,
  onCancel,
  isNextDisabled,
  prevButtonText = '이전',
  nextButtonText = '다음 단계로',
}: StepFormLayoutrProps) => {
  return (
    <main className="flex flex-1 flex-col px-5">
      <div className="pt-4 pb-8">
        <TitleGroup title={title} description={description} />
      </div>

      <div className="flex-1">{children}</div>

      <div className="flex gap-3 pt-3 pb-6">
        <Button theme="gray" onClick={onCancel} className="w-[114px]">
          {prevButtonText}
        </Button>
        <Button status={isNextDisabled ? 'disabled' : 'normal'} onClick={onNext} className="flex-1">
          {nextButtonText}
        </Button>
      </div>
    </main>
  );
};

export default StepFormLayout;

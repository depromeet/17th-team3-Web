import { X } from 'lucide-react';

interface BottomSheetProps {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ title, onClose, children }: BottomSheetProps) => {
  return (
    <div className="absolute inset-0 z-10">
      <div role="presentation" className="h-full bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 flex h-[198px] w-full flex-col justify-between rounded-t-2xl bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-neutral-1600">{title}</p>
          <X onClick={onClose} size={24} className="cursor-pointer" />
        </div>

        {children}
      </div>
    </div>
  );
};

export default BottomSheet;

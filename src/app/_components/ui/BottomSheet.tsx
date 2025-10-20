import { X } from 'lucide-react';

interface BottomSheetProps {
  title?: string;
  showCloseButton?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ title, showCloseButton = false, onClose, children }: BottomSheetProps) => {
  return (
    <div className="absolute inset-0 z-10">
      <div role="presentation" className="h-full bg-black/60" onClick={onClose} />
      <div className="absolute bottom-0 flex min-h-[198px] w-full flex-col justify-between gap-4 rounded-t-2xl bg-white p-5">
        <div className="text-center">
          <p className="body-3 font-semibold text-orange-700">{title}</p>
          {showCloseButton && (
            <X
              onClick={onClose}
              size={24}
              strokeWidth={2.25}
              className="absolute top-5 right-4 cursor-pointer text-orange-800"
            />
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;

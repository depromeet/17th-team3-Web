import { X } from 'lucide-react';

interface BottomSheetProps {
  title?: string;
  showCloseButton?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ title, showCloseButton = false, onClose, children }: BottomSheetProps) => {
  return (
    <>
      <div role="presentation" className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />
      <div className="fixed bottom-0 z-50 flex h-[90dvh] w-full max-w-[475px] flex-col justify-between gap-4 rounded-t-2xl bg-white p-5">
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
    </>
  );
};

export default BottomSheet;

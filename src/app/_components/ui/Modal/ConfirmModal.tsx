import Button from '@/app/_components/ui/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  confirmText = '네',
  cancelText = '아니오',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div role="presentation" className="absolute inset-0 bg-black/60" onClick={onCancel} />

      <div className="relative flex w-full max-w-[85%] flex-col gap-6 rounded-2xl bg-white p-4 pt-6">
        <h3 className="text-center body-3 font-semibold">{title}</h3>

        <div className="flex gap-4">
          <Button theme="gray" className="flex-1" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button className="flex-1" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal = ({ isOpen, onClose, children }: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div role="presentation" className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative flex w-full max-w-[310px] flex-col rounded-2xl bg-white p-4 pt-6">
        {children}
      </div>
    </div>
  );
};

export default BaseModal;

/**
 * 모달의 기본 레이아웃 컴포넌트
 * 배경 오버레이와 모달 컨테이너 제공
 */
interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal = ({ isOpen, onClose, children }: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div role="presentation" className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative flex w-full max-w-[85%] flex-col rounded-2xl bg-white p-4 pt-6">
        {children}
      </div>
    </div>
  );
};

export default BaseModal;

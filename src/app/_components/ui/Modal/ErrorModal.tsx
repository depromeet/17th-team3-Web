import Image from 'next/image';

import Button from '@/app/_components/ui/Button';

interface ErrorModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const ErrorModal = ({ isOpen, title, message, onClose }: ErrorModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div role="presentation" className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative flex w-full max-w-[85%] flex-col items-center gap-4 rounded-2xl bg-white p-4 pt-6">
        <Image src="/images/momuzzi-error.svg" alt="모무찌 에러 아이콘" width={80} height={20} />

        <div className="mb-2 flex flex-col gap-1">
          <h3 className="text-center body-2 font-semibold">{title}</h3>
          <p className="text-center body-3 whitespace-pre-wrap text-neutral-800">{message}</p>
        </div>

        <Button className="w-full" onClick={onClose}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default ErrorModal;

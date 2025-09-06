import Image from 'next/image';

interface ResultCardProps {
  title: string;
  subtitle: string;
  showConfetti?: boolean;
}

const ResultCard = ({ title, subtitle, showConfetti = false }: ResultCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Image src={'/firecracker.png'} alt="폭죽 이미지" width={156} height={156} />
      <h3 className="mt-3 text-2xl font-bold">{title}</h3>
      {/* todo: 스타일 검토 필요*/}
      <p className="font-medium text-gray-600">{subtitle}</p>
    </div>
  );
};

export default ResultCard;

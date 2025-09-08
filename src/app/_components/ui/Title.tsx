interface TitleProps {
  title: string;
  description?: React.ReactNode;
}

const Title = ({ title, description }: TitleProps) => {
  return (
    <header>
      {/* todo: 스타일 점검 */}
      <h1 className="text-2xl/[1.5] font-bold whitespace-pre-wrap">{title}</h1>
      {description && <p className="mt-2 text-sm/[1.7] text-gray-800">{description}</p>}
    </header>
  );
};

export default Title;

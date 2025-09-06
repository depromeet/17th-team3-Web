interface TitleProps {
  title: string;
  children?: React.ReactNode;
}

const Title = ({ title, children }: TitleProps) => {
  return (
    <header>
      {/* todo: 스타일 점검 */}
      <h1 className="text-2xl/[1.5] font-bold whitespace-pre-wrap">{title}</h1>
      {children && <p className="mt-2 text-sm/[1.7] text-gray-800">{children}</p>}
    </header>
  );
};

export default Title;

interface IconChipProps {
  icon: React.ReactNode;
  label: string;
}

const IconChip = ({ icon, label }: IconChipProps) => {
  return (
    <div className="flex h-7 flex-row items-center gap-0.5 rounded-[5rem] bg-white pr-4 pl-4">
      {icon}
      <span className="label-1 font-semibold text-neutral-1400"> {label}</span>
    </div>
  );
};

export default IconChip;

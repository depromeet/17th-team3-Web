import type { ReactNode } from 'react';

interface FormSectionProps {
  label: string;
  children: ReactNode;
}

const FormSection = ({ label, children }: FormSectionProps) => {
  return (
    <section className="flex flex-col gap-1">
      <h3 className="label-1 text-sm font-medium text-neutral-1000">{label}</h3>
      {children}
    </section>
  );
};

export default FormSection;

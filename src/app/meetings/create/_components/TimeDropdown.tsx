import { ChevronDown } from 'lucide-react';

import { cn } from '@/app/_lib/cn';

interface TimeDropdown {
  value: string | null;
  unit: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

const TimeDropdown = ({
  value,
  unit,
  options,
  isOpen,
  onToggle,
  onSelect,
  dropdownRef,
}: TimeDropdown) => (
  <div
    role="presentation"
    ref={dropdownRef}
    onClick={onToggle}
    className="relative flex items-center justify-center gap-2 border-b-1 border-neutral-300 py-2 pr-1 pl-5"
  >
    <div
      className={cn(
        'mr-4 flex items-center gap-2 body-1 font-semibold text-neutral-500',
        value !== null && 'text-neutral-1600'
      )}
    >
      {value === null ? '00' : value}
    </div>
    <span className="body-1 font-semibold text-neutral-1500">{unit}</span>
    <ChevronDown
      size={20}
      strokeWidth={2.5}
      className="cursor-pointer text-neutral-1500 transition-transform duration-150 active:scale-95"
    />

    {isOpen && (
      <div className="absolute top-13 right-0 z-10 max-h-60 w-35 overflow-hidden overflow-y-auto rounded-lg bg-white shadow-lg">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="w-full rounded-lg px-3 py-2 text-left body-3 font-semibold transition-all duration-150 select-none hover:bg-gray-50 active:scale-[0.98] active:bg-orange-500 active:text-neutral-100"
          >
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default TimeDropdown;

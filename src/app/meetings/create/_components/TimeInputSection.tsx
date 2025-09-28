import { useRef, useState } from 'react';

import { Clock } from 'lucide-react';

import { useClickOutside } from '@/app/_hooks/useClickOutside';
import TimeDropdown from '@/app/meetings/create/_components/TimeDropdown';
import { TIME_DROPDOWN_OPTION } from '@/app/meetings/create/_models/constants';

interface TimePickerProps {
  selectedHour: string | null;
  selectedMinute: string | null;
  onTimeChange: (hour: string | null, minute: string | null) => void;
}

const TimeInputSection = ({
  selectedHour = '00',
  selectedMinute = '00',
  onTimeChange,
}: TimePickerProps) => {
  const [showHourDropdown, setShowHourDropdown] = useState(false);
  const [showMinuteDropdown, setShowMinuteDropdown] = useState(false);

  const hourDropdownRef = useRef<HTMLDivElement>(null);
  const minuteDropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(hourDropdownRef, () => setShowHourDropdown(false));
  useClickOutside(minuteDropdownRef, () => setShowMinuteDropdown(false));

  return (
    <div className="flex w-full items-center gap-2 p-3">
      <Clock size={24} strokeWidth={2.5} className="text-neutral-500" />

      <TimeDropdown
        value={selectedHour}
        unit="시"
        options={TIME_DROPDOWN_OPTION.HOURS}
        isOpen={showHourDropdown}
        onToggle={() => setShowHourDropdown(!showHourDropdown)}
        onSelect={(hour) => {
          onTimeChange(hour, selectedMinute);
          setShowHourDropdown(false);
        }}
        dropdownRef={hourDropdownRef}
      />

      <div className="mx-2 text-neutral-1500">:</div>

      <TimeDropdown
        value={selectedMinute}
        unit="분"
        options={TIME_DROPDOWN_OPTION.MINUTES}
        isOpen={showMinuteDropdown}
        onToggle={() => setShowMinuteDropdown(!showMinuteDropdown)}
        onSelect={(minute) => {
          onTimeChange(selectedHour, minute);
          setShowMinuteDropdown(false);
        }}
        dropdownRef={minuteDropdownRef}
      />
    </div>
  );
};
export default TimeInputSection;

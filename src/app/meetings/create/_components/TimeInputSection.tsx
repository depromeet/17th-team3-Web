import { useRef, useState } from 'react';

import { Clock } from 'lucide-react';

import { useClickOutside } from '@/app/_hooks/useClickOutside';
import TimeDropdown from '@/app/meetings/create/_components/TimeDropdown';
import { TIME_DROPDOWN_OPTION } from '@/app/meetings/create/_models/constants';

interface TimePickerProps {
  hour: string | null;
  minute: string | null;
  onTimeChange: (hour: string | null, minute: string | null) => void;
}

const TimeInputSection = ({ hour = '00', minute = '00', onTimeChange }: TimePickerProps) => {
  const [showHourDropdown, setShowHourDropdown] = useState(false);
  const [showMinuteDropdown, setShowMinuteDropdown] = useState(false);

  const hourDropdownRef = useRef<HTMLDivElement>(null);
  const minuteDropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(hourDropdownRef, () => setShowHourDropdown(false));
  useClickOutside(minuteDropdownRef, () => setShowMinuteDropdown(false));

  const handleTimeChange = (option: 'hour' | 'minute', value: string) => {
    if (option === 'hour') {
      onTimeChange(value, minute);
      setShowHourDropdown(false);
    } else {
      onTimeChange(hour, value);
      setShowMinuteDropdown(false);
    }
  };

  return (
    <div className="flex w-full items-center gap-2 p-3">
      <Clock size={24} strokeWidth={2.5} className="text-neutral-500" />

      <TimeDropdown
        value={hour}
        unit="시"
        options={TIME_DROPDOWN_OPTION.HOURS}
        isOpen={showHourDropdown}
        onToggle={() => setShowHourDropdown(!showHourDropdown)}
        onSelect={(newHour) => handleTimeChange('hour', newHour)}
        dropdownRef={hourDropdownRef}
      />

      <div className="mx-2 text-neutral-1500">:</div>

      <TimeDropdown
        value={minute}
        unit="분"
        options={TIME_DROPDOWN_OPTION.MINUTES}
        isOpen={showMinuteDropdown}
        onToggle={() => setShowMinuteDropdown(!showMinuteDropdown)}
        onSelect={(newMinute) => handleTimeChange('minute', newMinute)}
        dropdownRef={minuteDropdownRef}
      />
    </div>
  );
};
export default TimeInputSection;

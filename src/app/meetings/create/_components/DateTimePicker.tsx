'use client';

import { useState, useRef } from 'react';

import { DatePicker } from '@mantine/dates';
import { CalendarPlus2, ChevronDown, Clock } from 'lucide-react';

import BottomSheet from '@/app/_components/ui/BottomSheet';
import Button from '@/app/_components/ui/Button';
import { useClickOutside } from '@/app/_hooks/useClickOutside';
import { cn } from '@/app/_lib/cn';

import 'dayjs/locale/ko';

interface DateTimePickerProps {
  dateValue?: string;
  onDateClick: (date: string) => void;
  onTimeClick: (hour: string | null, minute: string | null) => void;
  dateLabel?: string;
}

const DateTimePicker = ({
  dateValue = '',
  onDateClick,
  onTimeClick,
  dateLabel = '날짜 선택하기',
}: DateTimePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [hour, setHour] = useState<string | null>(null);
  const [minute, setMinute] = useState<string | null>(null);

  const handleDateSelect = () => {
    if (date) {
      onDateClick(date);
      setShowCalendar(false);
    }
  };

  const handleTimeSelect = (hour: string | null, minute: string | null) => {
    setHour(hour);
    setMinute(minute);
    onTimeClick(hour, minute);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setShowCalendar(true)}
          className={cn(
            'flex w-full items-center gap-3 border-b-1 border-b-neutral-300 px-3 py-3 body-1 font-semibold text-neutral-500',
            dateValue && 'text-gray-1600'
          )}
        >
          <CalendarPlus2 size={24} strokeWidth={2.5} className="text-neutral-500" />
          {dateValue || dateLabel}
        </button>

        <TimePicker selectedHour={hour} selectedMinute={minute} onTimeChange={handleTimeSelect} />
      </div>

      {showCalendar && (
        <BottomSheet onClose={() => setShowCalendar(false)}>
          <div className="flex flex-col items-center justify-center gap-6">
            <DatePicker
              value={date}
              onChange={setDate}
              minDate={new Date()}
              locale="ko"
              hideOutsideDates
              size="md"
              decadeLabelFormat="YYYY년"
              yearLabelFormat="YYYY년"
              monthLabelFormat="YYYY MM월"
              styles={{
                calendarHeaderLevel: {
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                },
                day: {
                  fontSize: '20px',
                  fontWeight: '400',
                  letterSpacing: '-0.45px',
                },
                weekday: {
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#3c3c3c',
                },
              }}
            />
            <Button onClick={handleDateSelect} status={!date ? 'disabled' : 'normal'}>
              선택
            </Button>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

interface TimePickerProps {
  selectedHour: string | null;
  selectedMinute: string | null;
  onTimeChange: (hour: string | null, minute: string | null) => void;
}

const TimePicker = ({
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

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = ['00', '10', '20', '30', '40', '50'];

  return (
    <div className="flex w-full items-center gap-2 p-3">
      <Clock size={24} strokeWidth={2.5} className="text-neutral-500" />

      <TimeUnit
        value={selectedHour}
        unit="시"
        options={hours}
        isOpen={showHourDropdown}
        onToggle={() => setShowHourDropdown(!showHourDropdown)}
        onSelect={(hour) => {
          onTimeChange(hour, selectedMinute);
          setShowHourDropdown(false);
        }}
        dropdownRef={hourDropdownRef}
      />

      <div className="mx-2 text-neutral-1500">:</div>

      <TimeUnit
        value={selectedMinute}
        unit="분"
        options={minutes}
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

interface TimeUnitProps {
  value: string | null;
  unit: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

const TimeUnit = ({
  value,
  unit,
  options,
  isOpen,
  onToggle,
  onSelect,
  dropdownRef,
}: TimeUnitProps) => (
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
      // onClick={onToggle}
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

export default DateTimePicker;

'use client';

import { useState, useRef, useCallback } from 'react';

import { DatePicker } from '@mantine/dates';
import { CalendarDays, Clock } from 'lucide-react';

import BottomSheet from '@/app/_components/ui/BottomSheet';
import Button from '@/app/_components/ui/Button';
import { useClickOutside } from '@/app/_hooks/useClickOutside';
import { cn } from '@/app/_lib/cn';
import TimePickerScroll from '@/app/meetings/create/_components/TimePickerScroll';

import 'dayjs/locale/ko';

interface DateTimePickerProps {
  date: string | null;
  time: string | null;
  onDateChange: (date: string | null) => void;
  onTimeChange: (time: string | null) => void;
}

const DateTimePicker = ({ date, time, onDateChange, onTimeChange }: DateTimePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [tempDate, setTempDate] = useState<string | null>(null);

  const handleConfirmDate = useCallback(() => {
    onDateChange(tempDate);
    setShowCalendar(false);
  }, [tempDate, onDateChange]);

  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setShowCalendar(true)}
          className={cn(
            'flex flex-1 items-center gap-8 border-b-1 border-b-neutral-200 pt-3 pr-3 pb-2 pl-1 body-2 font-semibold text-neutral-400',
            date && 'text-gray-1500'
          )}
        >
          <div className="flex items-center gap-3">
            <CalendarDays size={20} strokeWidth={2.5} className="text-neutral-400" />
            {date || '날짜 선택하기'}
          </div>
          <div className="flex items-center gap-3">
            <Clock size={20} strokeWidth={2.5} className="text-neutral-400" />
            {date || '시간 선택하기'}
          </div>
        </button>
      </div>

      {showCalendar && (
        <BottomSheet title="모임 날짜/시간" onClose={() => setShowCalendar(false)}>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex w-full flex-col items-center justify-center gap-1">
              <p className="self-start py-1 label-1 text-sm font-semibold text-neutral-800">
                날짜 선택
              </p>
              <DatePicker
                value={tempDate}
                onChange={(date) => setTempDate(date)}
                minDate={new Date()}
                locale="ko"
                hideOutsideDates
                size="md"
                decadeLabelFormat="YYYY년"
                yearLabelFormat="YYYY년"
                monthLabelFormat="YYYY MM월"
                styles={{
                  calendarHeaderLevel: {
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#131416',
                    lineHeight: '1.5rem',
                    letterSpacing: ' -0.01%',
                  },
                  day: {
                    fontSize: '0.875rem',
                    color: '#131416',
                    lineHeight: '1.375rem',
                    letterSpacing: ' -0.01%',
                    fontWeight: '500',
                  },
                  weekday: {
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#9ba3b0',
                    lineHeight: '1.375rem',
                    letterSpacing: ' -0.01%',
                  },
                }}
              />
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-1">
              <p className="self-start py-1 label-1 text-sm font-semibold text-neutral-800">
                시간 선택
              </p>
            </div>
            <TimePickerScroll onTimeChange={onTimeChange} />
            <Button onClick={handleConfirmDate} status={tempDate ? 'normal' : 'disabled'}>
              선택
            </Button>
          </div>
        </BottomSheet>
      )}
    </>
  );
};

interface TimePickerProps {
  selectedHour: string | null;
  onTimeChange: (hour: string | null) => void;
}

const TimePicker = ({ selectedHour, onTimeChange }: TimePickerProps) => {
  const [showHourDropdown, setShowHourDropdown] = useState(false);
  const hourDropdownRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

  useClickOutside(hourDropdownRef, () => setShowHourDropdown(false));

  const handleSelectHour = useCallback(
    (hour: string) => {
      onTimeChange(hour);
      setShowHourDropdown(false);
    },
    [onTimeChange]
  );

  const handleToggleDropdown = useCallback(() => {
    setShowHourDropdown((prev) => !prev);
  }, []);

  return (
    <div className="flex items-center gap-2 border-b-1 border-neutral-200">
      <Clock size={20} strokeWidth={2.5} className="text-neutral-400" />

      <div
        ref={hourDropdownRef}
        role="presentation"
        onClick={handleToggleDropdown}
        className="relative flex items-center justify-center gap-2 pt-3 pr-3 pb-2 pl-1"
      >
        <div
          className={cn(
            'mr-4 flex items-center gap-2 body-2 font-semibold text-neutral-400',
            selectedHour && 'text-neutral-1500'
          )}
        >
          {selectedHour || '00'}
        </div>
        <span className="body-1 font-semibold text-neutral-1500">시</span>

        {showHourDropdown && (
          <div className="absolute top-13 right-0 z-10 max-h-60 w-35 overflow-hidden overflow-y-auto rounded-lg bg-white shadow-lg">
            {hours.map((hour) => (
              <button
                key={hour}
                type="button"
                onClick={() => handleSelectHour(hour)}
                className="w-full rounded-lg px-3 py-2 text-left body-3 font-semibold transition-all duration-150 select-none hover:bg-gray-50 active:scale-[0.98] active:bg-orange-500 active:text-neutral-100"
              >
                {hour}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateTimePicker;

'use client';

import { useState, useRef, useCallback } from 'react';

import { DatePicker } from '@mantine/dates';
import { CalendarDays, Clock } from 'lucide-react';

import BottomSheet from '@/app/_components/ui/BottomSheet';
import Button from '@/app/_components/ui/Button';
import { useClickOutside } from '@/app/_hooks/useClickOutside';
import { cn } from '@/app/_lib/cn';

import 'dayjs/locale/ko';

/**
 * 날짜와 시간 선택 컴포넌트 (Controlled Component)
 */
interface DateTimePickerProps {
  date: string | null;
  time: string | null;
  onDateChange: (date: string | null) => void;
  onTimeChange: (time: string | null) => void;
  dateLabel?: string;
}

const DateTimePicker = ({
  date,
  time,
  onDateChange,
  onTimeChange,
  dateLabel = '날짜 선택하기',
}: DateTimePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);

  const handleOpenCalendar = useCallback(() => {
    setShowCalendar(true);
  }, []);

  const handleCloseCalendar = useCallback(() => {
    setShowCalendar(false);
    setTempDate(null);
  }, []);

  const handleDateChange = useCallback((date: Date | null) => {
    setTempDate(date);
  }, []);

  const handleConfirmDate = useCallback(() => {
    if (tempDate) {
      const dateString = tempDate.toISOString().split('T')[0];
      onDateChange(dateString);
      handleCloseCalendar();
    }
  }, [tempDate, onDateChange, handleCloseCalendar]);

  return (
    <>
      <div className="flex items-center">
        {/* 날짜 선택 버튼 */}
        <button
          type="button"
          onClick={handleOpenCalendar}
          className={cn(
            'flex flex-1 items-center gap-3 border-b-1 border-b-neutral-200 pt-3 pr-3 pb-2 pl-1 body-2 font-semibold text-neutral-400',
            date && 'text-gray-1500'
          )}
        >
          <CalendarDays size={20} strokeWidth={2.5} className="text-neutral-400" />
          {date || dateLabel}
        </button>

        {/* 시간 선택 */}
        <TimePicker selectedHour={time} onTimeChange={onTimeChange} />
      </div>

      {/* 달력 모달 */}
      {showCalendar && (
        <BottomSheet onClose={handleCloseCalendar}>
          <div className="flex flex-col items-center justify-center gap-6">
            <DatePicker
              value={tempDate}
              onChange={handleDateChange as any}
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
            <Button onClick={handleConfirmDate} status={tempDate ? 'normal' : 'disabled'}>
              선택
            </Button>
          </div>
        </BottomSheet>
      )}
    </>
  );
};

/**
 * 시간 선택 서브 컴포넌트
 */
interface TimePickerProps {
  selectedHour: string | null;
  onTimeChange: (hour: string | null) => void;
}

const TimePicker = ({ selectedHour, onTimeChange }: TimePickerProps) => {
  const [showHourDropdown, setShowHourDropdown] = useState(false);
  const hourDropdownRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));

  // 외부 클릭 감지
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

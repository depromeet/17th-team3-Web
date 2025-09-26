'use client';

import { CalendarPlus2, Clock } from 'lucide-react';

import { cn } from '@/app/_lib/cn';

interface DateTimePickerProps {
  dateValue?: string;
  timeValue?: string;
  onDateClick: () => void;
  onTimeClick: () => void;
  dateLabel?: string;
  timeLabel?: string;
}

interface PickerItemProps {
  value: string;
  onClick: () => void;
  placeholder?: string;
}

const basePickerStyles =
  'flex w-full items-center gap-3 border-b-1 border-b-neutral-300 px-3 py-3 body-1 font-semibold text-neutral-500 select-none';

const DatePickerItem = ({ value, onClick, placeholder = '날짜 선택하기' }: PickerItemProps) => (
  <button
    aria-label={`${placeholder} 버튼`}
    onClick={onClick}
    className={cn(basePickerStyles, value && 'text-gray-1600')}
  >
    <CalendarPlus2 size={24} strokeWidth={2.5} className="text-neutral-500" />
    {value || placeholder}
  </button>
);

const TimePickerItem = ({ value, onClick, placeholder = '시간 선택하기' }: PickerItemProps) => (
  <button
    aria-label={`${placeholder} 버튼`}
    onClick={onClick}
    className={cn(basePickerStyles, value && 'text-gray-1600')}
  >
    <Clock size={24} strokeWidth={2.5} className="text-neutral-500" />
    {value || placeholder}
  </button>
);

const DateTimePicker = ({
  dateValue = '',
  timeValue = '',
  onDateClick,
  onTimeClick,
  dateLabel = '날짜 선택하기',
  timeLabel = '시간 선택하기',
}: DateTimePickerProps) => {
  return (
    <div className={cn('flex flex-col gap-4')}>
      <DatePickerItem value={dateValue} onClick={onDateClick} placeholder={dateLabel} />
      <TimePickerItem value={timeValue} onClick={onTimeClick} placeholder={timeLabel} />
    </div>
  );
};

export default DateTimePicker;

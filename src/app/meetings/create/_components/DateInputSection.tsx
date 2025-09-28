'use client';

import { useState } from 'react';

import { DatePicker } from '@mantine/dates';
import { CalendarPlus2 } from 'lucide-react';

import BottomSheet from '@/app/_components/ui/BottomSheet';
import Button from '@/app/_components/ui/Button';
import { cn } from '@/app/_lib/cn';

import 'dayjs/locale/ko';

interface DateInputSectionProps {
  date: string | null;
  label?: string;
  onDateClick: (date: string | null) => void;
}

const DateInputSection = ({
  date,
  label = '날짜 선택하기',
  onDateClick,
}: DateInputSectionProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = () => {
    if (date) {
      onDateClick(date);
      setShowCalendar(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setShowCalendar(true)}
          className={cn(
            'flex w-full items-center gap-3 border-b-1 border-b-neutral-300 px-3 py-3 body-1 font-semibold text-neutral-500',
            date && 'text-gray-1600'
          )}
        >
          <CalendarPlus2 size={24} strokeWidth={2.5} className="text-neutral-500" />
          {date || label}
        </button>
      </div>

      {showCalendar && (
        <BottomSheet onClose={() => setShowCalendar(false)}>
          <div className="flex flex-col items-center justify-center gap-6">
            <DatePicker
              value={date}
              onChange={onDateClick}
              minDate={new Date()}
              locale="ko"
              hideOutsideDates
              size="md"
              decadeLabelFormat="YYYY년"
              yearLabelFormat="YYYY년"
              monthLabelFormat="YYYY MM월"
              styles={calendarStyle}
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

const calendarStyle = {
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
};

export default DateInputSection;

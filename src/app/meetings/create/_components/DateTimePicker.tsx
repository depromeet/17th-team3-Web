'use client';

import { useState } from 'react';

import { DatePicker } from '@mantine/dates';
import { CalendarPlus2, Clock } from 'lucide-react';

import BottomSheet from '@/app/_components/ui/BottomSheet';
import Button from '@/app/_components/ui/Button';
import { cn } from '@/app/_lib/cn';

import 'dayjs/locale/ko';

interface DateTimePickerProps {
  dateValue?: string;
  timeValue?: string;
  onDateClick: (date: string) => void;
  onTimeClick: (time: string) => void;
  dateLabel?: string;
  timeLabel?: string;
}
const DateTimePicker = ({
  dateValue = '',
  timeValue = '',
  onDateClick,
  // onTimeClick,
  dateLabel = '날짜 선택하기',
  timeLabel = '시간 선택하기',
}: DateTimePickerProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateSelect = () => {
    if (selectedDate) {
      onDateClick(selectedDate);
      setShowCalendar(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setShowCalendar(true)}
          className={cn(
            'flex w-full items-center gap-3 border-b-1 border-b-neutral-300 px-3 py-3 body-1 font-semibold text-neutral-500 select-none',
            dateValue && 'text-gray-1600'
          )}
        >
          <CalendarPlus2 size={24} strokeWidth={2.5} className="text-neutral-500" />
          {dateValue || dateLabel}
        </button>

        <button
          onClick={() => {}}
          className={cn(
            'flex w-full items-center gap-3 border-b-1 border-b-neutral-300 px-3 py-3 body-1 font-semibold text-neutral-500 select-none',
            timeValue && 'text-gray-1600'
          )}
        >
          <Clock size={24} strokeWidth={2.5} className="text-neutral-500" />
          {timeValue || timeLabel}
        </button>
      </div>

      {showCalendar && (
        <BottomSheet onClose={() => setShowCalendar(false)}>
          <div className="flex flex-col items-center justify-center gap-6">
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
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
                  '&[dataSelected]': {
                    backgroundColor: '#ff6b35',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                  },
                  '&[data-selected]': {
                    backgroundColor: 'var(--mantine-color-primary-filled)',
                    color: 'white',
                  },
                },
                weekday: {
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#3c3c3c',
                },
              }}
            />
            <Button onClick={handleDateSelect} status={!selectedDate ? 'disabled' : 'normal'}>
              선택
            </Button>
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

export default DateTimePicker;

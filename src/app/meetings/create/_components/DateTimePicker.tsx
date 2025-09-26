'use client';

import { useState } from 'react';

import { DatePicker } from '@mantine/dates';
import { CalendarPlus2, ChevronDown, Clock } from 'lucide-react';
import Image from 'next/image';

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
  const [showTimer, setShowTimer] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');

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
        <TimePicker
          selectedHour={hour}
          selectedMinute={minute}
          onTimeChange={(newHour, newMinute) => {
            setHour(newHour);
            setMinute(newMinute);
            onDateClick(`${newHour}:${newMinute}`);
          }}
        />
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

const TimePicker = ({
  selectedHour = '00',
  selectedMinute = '00',
  onTimeChange,
}: {
  selectedHour?: string;
  selectedMinute?: string;
  onTimeChange: (hour: string, minute: string) => void;
}) => {
  const [showHourDropdown, setShowHourDropdown] = useState(false);
  const [showMinuteDropdown, setShowMinuteDropdown] = useState(false);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = ['00', '10', '20', '30', '40', '50'];

  const currentHour = new Date().getHours();
  const isValidHour = (hour: string) => parseInt(hour) > currentHour;

  const toggleHourDropdown = () => {
    setShowHourDropdown(!showHourDropdown);
    setShowMinuteDropdown(false);
  };

  const toggleMinuteDropdown = () => {
    setShowMinuteDropdown(!showMinuteDropdown);
    setShowHourDropdown(false);
  };

  return (
    <div className="flex w-full items-center justify-center gap-2 p-3">
      <Clock size={24} strokeWidth={2.5} className="text-neutral-500" />

      <div className="flex items-center justify-center gap-2 border-b-1 border-neutral-300 py-2 pr-1 pl-5">
        <div className="mr-4 flex items-center gap-2 body-1 font-semibold text-neutral-500">
          {selectedHour}
        </div>
        <span className="body-1 font-semibold text-neutral-1500">시</span>
        <ChevronDown
          size={20}
          strokeWidth={2.5}
          className="text-neutral-1500"
          onClick={toggleHourDropdown}
        />

        {showHourDropdown && (
          <div className="absolute bottom-0 flex justify-center px-4">
            <div className="max-h-80 w-32 overflow-hidden rounded-2xl bg-white shadow-lg">
              <div className="max-h-80 overflow-y-auto">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => {
                      onTimeChange(hour, selectedMinute);
                      setShowHourDropdown(false);
                    }}
                    disabled={!isValidHour(hour)}
                    className={`w-full px-4 py-3 text-center text-xl font-medium transition-colors ${
                      selectedHour === hour
                        ? 'mx-1 my-1 rounded-xl bg-red-500 text-white'
                        : 'hover:bg-gray-50'
                    } ${!isValidHour(hour) ? 'cursor-not-allowed text-gray-300' : ''}`}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Image
        src="/icons/colon.svg"
        alt="colon-icon"
        width={24}
        height={24}
        className="text-neutral-500"
      />

      <div className="flex items-center justify-center gap-2 border-b-1 border-neutral-300 py-2 pr-1 pl-5">
        <div className="mr-4 flex items-center gap-2 body-1 font-semibold text-neutral-500">
          {selectedHour}
        </div>
        <span className="body-1 font-semibold text-neutral-1500">분</span>
        <ChevronDown
          size={20}
          strokeWidth={2.5}
          className="text-neutral-1500"
          onClick={toggleMinuteDropdown}
        />
      </div>
      {showMinuteDropdown && (
        <div className="absolute flex justify-center px-4">
          <div className="max-h-80 w-32 overflow-hidden rounded-2xl bg-white shadow-lg">
            <div className="max-h-80 overflow-y-auto">
              {minutes.map((minute) => (
                <button
                  key={minute}
                  onClick={() => {
                    onTimeChange(selectedHour, minute);
                    setShowMinuteDropdown(false);
                  }}
                  className={`w-full px-4 py-3 text-center text-xl font-medium transition-colors ${
                    selectedMinute === minute
                      ? 'mx-1 my-1 rounded-xl bg-red-500 text-white'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {minute}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;

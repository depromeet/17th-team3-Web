'use client';

import { useState } from 'react';

import StepFormLayout from '@/app/meetings/_components/StepFormLayout';
import DateInputSection from '@/app/meetings/create/_components/DateInputSection';
import TimeInputSection from '@/app/meetings/create/_components/TimeInputSection';

interface DateTimeStepProps {
  onNext: (date: string, time: string) => void;
  onCancel: () => void;
}

const DateTimeStep = ({ onNext, onCancel }: DateTimeStepProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hour, setHour] = useState<string | null>(null);
  const [minute, setMinute] = useState<string | null>(null);

  const handleTimeSelect = (hour: string | null, minute: string | null) => {
    setHour(hour);
    setMinute(minute);
  };

  const handleNext = () => {
    if (selectedDate) {
      onNext(selectedDate, `${hour}:${minute}`);
    }
  };

  return (
    <StepFormLayout
      title="언제 만나시나요?"
      onNext={handleNext}
      onCancel={onCancel}
      isNextDisabled={!selectedDate || !hour}
      nextButtonText="생성하기"
    >
      <div className="flex flex-col gap-5">
        <DateInputSection
          dateValue={selectedDate}
          onDateClick={(date: string | null) => setSelectedDate(date)}
        />
        <TimeInputSection
          selectedHour={hour}
          selectedMinute={minute}
          onTimeChange={handleTimeSelect}
        />
        <div className="flex items-center justify-center rounded-sm bg-orange-500/[0.14] p-3 text-xs font-medium text-orange-600">
          모임 시간 1시간 전에 자동으로 식사 취향 설문이 마감됩니다.
        </div>
      </div>
    </StepFormLayout>
  );
};

export default DateTimeStep;

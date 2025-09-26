'use client';

import { useState } from 'react';

import StepFormLayout from '@/app/meetings/_components/StepFormLayout';
import DateTimePicker from '@/app/meetings/create/_components/DateTimePicker';

interface DateTimeStepProps {
  onNext: (date: string, time: string) => void;
  onCancel: () => void;
}

const DateTimeStep = ({ onNext, onCancel }: DateTimeStepProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleDateClick = (data: string) => {
    setSelectedDate(data);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    onNext(selectedDate, selectedTime);
  };

  return (
    <StepFormLayout
      title="언제 만나시나요?"
      onNext={handleNext}
      onCancel={onCancel}
      isNextDisabled={!selectedDate || !selectedTime}
      nextButtonText="생성하기"
    >
      <div className="flex flex-col gap-5">
        <DateTimePicker
          dateValue={selectedDate}
          timeValue={selectedTime}
          onDateClick={handleDateClick}
          onTimeClick={handleTimeClick}
        />
        <div className="flex items-center justify-center rounded-sm bg-orange-500/[0.14] p-3 text-xs font-medium text-orange-600">
          모임 시간 1시간 전에 자동으로 식사 취향 설문이 마감됩니다.
        </div>
      </div>
    </StepFormLayout>
  );
};

export default DateTimeStep;

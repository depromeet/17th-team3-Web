'use client';

import { useState } from 'react';

import StepFormLayout from '@/app/meetings/_components/StepFormLayout';
import DateTimePicker from '@/app/meetings/create/_components/DateTimePicker';

interface DateTimeStepProps {
  onNext: (date: string, time: string) => void;
  onCancel: () => void;
  initialValue: { date: string; time: string };
}

const DateTimeStep = ({ onNext, onCancel, initialValue }: DateTimeStepProps) => {
  const { date, time } = initialValue;
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedTime, setSelectedTime] = useState(time);

  const handleDateClick = () => {
    // todo: 수정 필요
    setSelectedDate('2025-07-24');
  };

  const handleTimeClick = () => {
    // todo: 수정 필요
    setSelectedTime('14:34:00');
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
      <DateTimePicker
        dateValue={selectedDate}
        timeValue={selectedTime}
        onDateClick={handleDateClick}
        onTimeClick={handleTimeClick}
        className="mb-5"
      />
      <div className="flex items-center justify-center rounded-sm bg-orange-500/[0.114] p-3 text-xs font-medium text-orange-600">
        모임 시간 1시간 전에 자동으로 식사 취향 설문이 마감됩니다.
      </div>
    </StepFormLayout>
  );
};

export default DateTimeStep;

'use client';

import { useEffect, useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '@/app/_lib/cn';

interface TimePickerScrollProps {
  onTimeChange: (time: string | null) => void;
}

type Period = '오전' | '오후';

const TimePickerScroll = ({ onTimeChange }: TimePickerScrollProps) => {
  const [hour, setHour] = useState(1);
  const [period, setPeriod] = useState<Period>('오전');

  const periods: Period[] = ['오전', '오후'];
  const hours = Array.from({ length: 12 }, (_, index) => index + 1);

  const periodIndex = periods.indexOf(period);
  const hourIndex = hours.indexOf(hour);

  // 높이 계산 (가운데 위치 계산용)
  const itemHeight = 36; // 각 아이템의 높이 (body-1 + py-2)
  const paddingHeight = 48; // 위쪽 패딩 (h-12)
  const containerHeight = 140; // h-35 = 140px
  const centerOffset = containerHeight / 2 - itemHeight / 2;

  // 스크롤 위치 계산 (transform 오프셋으로 사용)
  const periodOffset = -(periodIndex * itemHeight + paddingHeight - centerOffset + 15);
  const hourOffset = -(hourIndex * itemHeight + paddingHeight - centerOffset + 15);

  // 시간이나 오전/오후가 변경될 때 콜백 호출
  useEffect(() => {
    let fullHour: number;
    if (period === '오전') {
      fullHour = hour === 12 ? 0 : hour;
    } else {
      fullHour = hour === 12 ? 12 : hour + 12;
    }
    const timeString = fullHour.toString().padStart(2, '0');
    onTimeChange(timeString);
  }, [hour, period, onTimeChange]);

  const handlePeriodUp = () => {
    if (period !== '오전') {
      setPeriod('오전');
    }
  };

  const handlePeriodDown = () => {
    if (period !== '오후') {
      setPeriod('오후');
    }
  };

  const handleHourUp = () => {
    setHour((prev) => prev - 1);
  };

  const handleHourDown = () => {
    setHour((prev) => prev + 1);
  };

  const isPeriodUpDisabled = period === '오전';
  const isPeriodDownDisabled = period === '오후';
  const isHourUpDisabled = hour === 1;
  const isHourDownDisabled = hour === 12;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex justify-center gap-3">
        <div className="flex w-full flex-col items-center gap-3">
          <button
            type="button"
            onClick={handlePeriodUp}
            disabled={isPeriodUpDisabled}
            className={'flex items-center justify-center rounded transition-colors'}
            aria-label="이전"
          >
            <ChevronUp
              size={24}
              strokeWidth={2}
              className={cn(isPeriodUpDisabled ? 'text-neutral-400' : 'text-neutral-1600')}
            />
          </button>

          <div className="relative h-35 w-full overflow-hidden rounded-lg bg-[#f6f7f9]">
            <div
              className="flex flex-col gap-2 px-5 py-2 transition-transform duration-300"
              style={{ transform: `translateY(${periodOffset}px)` }}
            >
              <div className="h-12" />
              {periods.map((period_) => (
                <button
                  key={period_}
                  type="button"
                  onClick={() => setPeriod(period_)}
                  className={cn(
                    'text-center body-1 transition-colors duration-200',
                    period_ === period ? 'text-neutral-1600' : 'text-neutral-400'
                  )}
                >
                  {period_}
                </button>
              ))}
              <div className="h-12" />
            </div>
          </div>

          <button
            type="button"
            onClick={handlePeriodDown}
            disabled={isPeriodDownDisabled}
            className={'flex items-center justify-center rounded transition-colors'}
            aria-label="다음"
          >
            <ChevronDown
              size={24}
              strokeWidth={2}
              className={cn(isPeriodDownDisabled ? 'text-neutral-400' : 'text-neutral-1600')}
            />
          </button>
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleHourUp}
            disabled={isHourUpDisabled}
            className={cn('flex items-center justify-center rounded transition-colors')}
            aria-label="이전"
          >
            <ChevronUp
              size={24}
              strokeWidth={2}
              className={cn(isHourUpDisabled ? 'text-neutral-400' : 'text-neutral-1600')}
            />
          </button>

          <div className="relative h-35 w-full overflow-hidden rounded-lg bg-[#f6f7f9]">
            <div
              className="flex flex-col gap-2 px-5 py-2 transition-transform duration-300"
              style={{ transform: `translateY(${hourOffset}px)` }}
            >
              <div className="h-12" />
              {hours.map((hour_) => (
                <button
                  key={hour_}
                  type="button"
                  onClick={() => setHour(hour_)}
                  className={cn(
                    'text-center body-1 transition-colors duration-200',
                    hour_ === hour ? 'text-neutral-1600' : 'text-neutral-400'
                  )}
                >
                  {hour_.toString()}시
                </button>
              ))}
              <div className="h-12" />
            </div>
          </div>

          <button
            type="button"
            onClick={handleHourDown}
            disabled={isHourDownDisabled}
            className={cn('flex h-8 w-8 items-center justify-center rounded transition-colors')}
            aria-label="다음"
          >
            <ChevronDown
              size={24}
              strokeWidth={2}
              className={cn(isHourDownDisabled ? 'text-neutral-400' : 'text-neutral-1600')}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerScroll;

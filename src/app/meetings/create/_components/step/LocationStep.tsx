'use client';

import { useState } from 'react';

import { Check } from 'lucide-react';

import Input from '@/app/_components/ui/Input';
import { cn } from '@/app/_lib/cn';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';

interface LocationStepProps {
  onNext: (location: string) => void;
  onCancel: () => void;
}

const LocationItem = ({
  station,
  onClick,
  isSelected = false,
}: {
  station: string;
  onClick: () => void;
  isSelected?: boolean;
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      onClick={onClick}
      className={cn(
        'flex items-center justify-between rounded-xl px-3 py-[10px] body-1 font-semibold',
        isSelected && 'bg-orange-500/[0.14]'
      )}
    >
      <p>
        <span className="text-orange-500">강</span>
        {station}
      </p>
      {isSelected && (
        <Check size={24} strokeWidth={4} className="rounded-full bg-orange-500 p-1.5 text-white" />
      )}
    </div>
  );
};

const LocationStep = ({ onNext, onCancel }: LocationStepProps) => {
  const [location, setLocation] = useState('');
  // todo: 유효성 검증 어떻게 가져갈지? (e.g. 지하철역 list 중 하나 이상의 item 선택 시)
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleStationClick = (station: string) => {
    setLocation(station);
    setSelectedLocation(station);
  };

  const handleNext = () => {
    onNext(location);
  };

  return (
    <StepFormLayout
      title={`모임을 진행할 장소를\n설정해주세요`}
      onNext={handleNext}
      onCancel={onCancel}
      isNextDisabled={!selectedLocation}
    >
      <div className="flex flex-col gap-5">
        <Input
          type="search"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onClear={() => setLocation('')}
          showClearButton
        />
        <div className="flex flex-col gap-3">
          {/* todo: 추후 자동완성 로직 구상 필요 */}
          <LocationItem station="남역" onClick={() => handleStationClick('강남역')} isSelected />
          <LocationItem station="변역" onClick={() => handleStationClick('강변역')} />
        </div>
      </div>
    </StepFormLayout>
  );
};

export default LocationStep;

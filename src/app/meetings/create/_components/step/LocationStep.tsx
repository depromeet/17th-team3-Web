'use client';

import { useState, useMemo } from 'react';

import { Check, MapPin } from 'lucide-react';

import BottomSheet from '@/app/_components/ui/BottomSheet';
import Input from '@/app/_components/ui/Input';
import { cn } from '@/app/_lib/cn';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';

const STATION_DATA = [
  { id: 1, name: '강남역' },
  { id: 2, name: '강변역' },
  { id: 3, name: '강북역' },
  { id: 4, name: '강서구청역' },
  { id: 5, name: '건대입구역' },
  { id: 6, name: '경복궁역' },
  { id: 7, name: '고속터미널역' },
  { id: 8, name: '공릉역' },
  { id: 9, name: '광화문역' },
  { id: 10, name: '구로역' },
];

interface LocationStepProps {
  onNext: (location: string) => void;
  onCancel: () => void;
}

interface Station {
  id: number;
  name: string;
}

const LocationItem = ({
  station,
  onClick,
  isSelected = false,
}: {
  station: Station;
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
        'flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition-colors',
        isSelected ? 'bg-orange-500 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
      )}
    >
      <p className="text-lg font-semibold">{station.name}</p>
      {isSelected && <Check size={24} className="text-white" strokeWidth={2} />}
    </div>
  );
};

const LocationStep = ({ onNext, onCancel }: LocationStepProps) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [showResults, setShowResults] = useState(false);

  const filteredStations = useMemo(() => {
    if (!inputValue.trim()) return [];

    return STATION_DATA.filter((station) => station.name.includes(inputValue));
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    setShowResults(value.length > 0);

    const exactMatch = STATION_DATA.find((station) => station.name === value);
    if (exactMatch) {
      setSelectedStation(exactMatch);
    } else if (selectedStation && selectedStation.name !== value) {
      setSelectedStation(null);
    }
  };

  const handleStationSelect = (station: Station) => {
    setSelectedStation(station);
    setInputValue(station.name);
    setShowResults(false);
  };

  const handleInputFocus = () => {
    if (inputValue) {
      setShowResults(true);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setSelectedStation(null);
    setShowResults(false);
  };

  const handleNext = () => {
    if (selectedStation) {
      onNext(selectedStation.name);
    }
  };

  return (
    <StepFormLayout
      title={`모임을 진행할 장소를\n설정해주세요`}
      onNext={handleNext}
      onCancel={onCancel}
      isNextDisabled={!selectedStation}
    >
      <div className="flex flex-col gap-5">
        <div className="flex w-full items-center gap-3 border-b-1 border-b-neutral-300 px-3 py-3 body-1 font-semibold text-neutral-500 select-none">
          <MapPin size={24} />
          <p>지하철역으로 검색</p>
        </div>
      </div>

      <BottomSheet title="장소 선택" showCloseButton onClose={() => console.log()}>
        <div className="flex h-120 flex-col gap-2">
          <Input
            type="search"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onClear={handleClear}
            showClearButton
            placeholder="지하철역을 검색해주세요"
          />

          {showResults && filteredStations.length > 0 && (
            <div>
              {filteredStations.map((station) => (
                <LocationItem
                  key={station.id}
                  station={station}
                  onClick={() => handleStationSelect(station)}
                  isSelected={selectedStation?.id === station.id}
                />
              ))}
            </div>
          )}

          {showResults && inputValue && filteredStations.length === 0 && (
            <div>
              <div className="p-4 text-center text-gray-500">검색 결과가 없습니다</div>
            </div>
          )}
        </div>
      </BottomSheet>
    </StepFormLayout>
  );
};

{
  /* <div className="flex flex-col gap-5">
  <div className="relative">
    <Input
      type="search"
      value={inputValue}
      onChange={handleInputChange}
      onFocus={handleInputFocus}
      onClear={handleClear}
      showClearButton
      placeholder="지하철역을 검색해주세요"
    />

    {showResults && filteredStations.length > 0 && (
      <div className="absolute top-full right-0 left-0 z-10 mt-1 max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
        <div className="p-2">
          {filteredStations.map((station) => (
            <LocationItem
              key={station.id}
              station={station}
              onClick={() => handleStationSelect(station)}
              isSelected={selectedStation?.id === station.id}
            />
          ))}
        </div>
      </div>
    )}

    {showResults && inputValue && filteredStations.length === 0 && (
      <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-xl border border-gray-200 bg-white shadow-lg">
        <div className="p-4 text-center text-gray-500">검색 결과가 없습니다</div>
      </div>
    )}
  </div>
</div>; */
}

export default LocationStep;

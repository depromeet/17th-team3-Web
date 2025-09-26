'use client';

import { useState, useMemo } from 'react';

import { MapPin } from 'lucide-react';

import BottomSheet from '@/app/_components/ui/BottomSheet';
import Input from '@/app/_components/ui/Input';
import { cn } from '@/app/_lib/cn';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';

interface LocationStepProps {
  onNext: (location: string) => void;
  onCancel: () => void;
}

const LocationStep = ({ onNext, onCancel }: LocationStepProps) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const filteredStations = useMemo(() => {
    if (!inputValue.trim()) return [];
    return STATION_DATA.filter((station) => station.name.includes(inputValue));
  }, [inputValue]);

  const toggleBottomSheet = () => {
    setShowBottomSheet((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);

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
  };

  const handleClear = () => {
    setInputValue('');
    setSelectedStation(null);
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
      <button
        type="button"
        onClick={toggleBottomSheet}
        className="flex w-full items-center gap-3 border-b-1 border-b-neutral-300 px-3 py-3 body-1 font-semibold text-neutral-500 select-none"
      >
        <MapPin size={24} />
        <p className={cn('text-neutral-500', selectedStation && 'text-neutral-1500')}>
          {selectedStation?.name || '지하철역으로 검색'}
        </p>
      </button>

      {showBottomSheet && (
        <BottomSheet title="장소 선택" showCloseButton onClose={toggleBottomSheet}>
          <div className="flex h-120 flex-col gap-2">
            <Input
              type="search"
              value={inputValue}
              onChange={handleInputChange}
              onClear={handleClear}
              showClearButton
              placeholder="지하철역을 검색해주세요"
            />
            {filteredStations.length > 0 && (
              <div className="mt-3">
                {filteredStations.map((station) => (
                  <LocationItem
                    key={station.id}
                    station={station}
                    onClick={() => handleStationSelect(station)}
                  />
                ))}
              </div>
            )}
          </div>
        </BottomSheet>
      )}
    </StepFormLayout>
  );
};

interface Station {
  id: number;
  name: string;
}

const LocationItem = ({ station, onClick }: { station: Station; onClick: () => void }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      onClick={onClick}
      className="rounded-xl p-[0.625rem] text-lg font-semibold transition-all duration-150 active:scale-98 active:bg-orange-500/8"
    >
      {station.name}
    </div>
  );
};

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
  { id: 11, name: '구로디지털단지역' },
  { id: 12, name: '군자역' },
  { id: 13, name: '굽은다리역' },
  { id: 14, name: '길음역' },
  { id: 15, name: '낙성대역' },
  { id: 16, name: '남구로역' },
  { id: 17, name: '남부터미널역' },
  { id: 18, name: '남성역' },
  { id: 19, name: '남태령역' },
  { id: 20, name: '내방역' },
  { id: 21, name: '노원역' },
  { id: 22, name: '논현역' },
  { id: 23, name: '당산역' },
  { id: 24, name: '당고개역' },
  { id: 25, name: '대림역' },
  { id: 26, name: '대청역' },
  { id: 27, name: '대치역' },
  { id: 28, name: '대학로역' },
  { id: 29, name: '대흥역' },
  { id: 30, name: '도곡역' },
  { id: 31, name: '도림천역' },
  { id: 32, name: '도봉산역' },
  { id: 33, name: '독립문역' },
  { id: 34, name: '돌곶이역' },
  { id: 35, name: '동대문역' },
  { id: 36, name: '동대문역사문화공원역' },
  { id: 37, name: '동묘앞역' },
  { id: 38, name: '동작역' },
  { id: 39, name: '뚝섬역' },
  { id: 40, name: '마곡역' },
  { id: 41, name: '마곡나루역' },
  { id: 42, name: '마들역' },
  { id: 43, name: '마포역' },
  { id: 44, name: '망우역' },
  { id: 45, name: '망원역' },
  { id: 46, name: '매봉역' },
  { id: 47, name: '명동역' },
  { id: 48, name: '목동역' },
  { id: 49, name: '몽촌토성역' },
  { id: 50, name: '무악재역' },
  { id: 51, name: '문래역' },
  { id: 52, name: '미아역' },
  { id: 53, name: '미아사거리역' },
  { id: 54, name: '방배역' },
  { id: 55, name: '방이역' },
  { id: 56, name: '방화역' },
  { id: 57, name: '배방역' },
  { id: 58, name: '버티고개역' },
  { id: 59, name: '번동역' },
  { id: 60, name: '별내역' },
  { id: 61, name: '보라매역' },
  { id: 62, name: '보문역' },
  { id: 63, name: '복정역' },
  { id: 64, name: '봉천역' },
  { id: 65, name: '봉화산역' },
  { id: 66, name: '사당역' },
  { id: 67, name: '사릉역' },
  { id: 68, name: '삼각지역' },
  { id: 69, name: '삼성역' },
  { id: 70, name: '삼성중앙역' },
  { id: 71, name: '삼전역' },
  { id: 72, name: '상계역' },
  { id: 73, name: '상도역' },
  { id: 74, name: '상봉역' },
  { id: 75, name: '상수역' },
  { id: 76, name: '상왕십리역' },
  { id: 77, name: '상월곡역' },
  { id: 78, name: '상일동역' },
  { id: 79, name: '새절역' },
  { id: 80, name: '서강대역' },
  { id: 81, name: '서대문역' },
  { id: 82, name: '서울역' },
  { id: 83, name: '서초역' },
  { id: 84, name: '석계역' },
  { id: 85, name: '선릉역' },
  { id: 86, name: '선정릉역' },
  { id: 87, name: '성균관대역' },
  { id: 88, name: '성수역' },
  { id: 89, name: '성신여대입구역' },
  { id: 90, name: '세곡역' },
  { id: 91, name: '세종대왕릉역' },
  { id: 92, name: '송파역' },
  { id: 93, name: '송파나루역' },
  { id: 94, name: '수서역' },
  { id: 95, name: '숙대입구역' },
  { id: 96, name: '숭실대입구역' },
  { id: 97, name: '시청역' },
  { id: 98, name: '신금호역' },
  { id: 99, name: '신길역' },
  { id: 100, name: '신도림역' },
];

export default LocationStep;

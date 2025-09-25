// 'use client';

// import { useState } from 'react';

// import { Check } from 'lucide-react';

// import Input from '@/app/_components/ui/Input';
// import { cn } from '@/app/_lib/cn';
// import StepFormLayout from '@/app/meetings/_components/StepFormLayout';

// interface LocationStepProps {
//   onNext: (location: string) => void;
//   onCancel: () => void;
// }

// const LocationItem = ({
//   station,
//   onClick,
//   isSelected = false,
// }: {
//   station: string;
//   onClick: () => void;
//   isSelected?: boolean;
// }) => {
//   return (
//     <div
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => e.key === 'Enter' && onClick()}
//       onClick={onClick}
//       className={cn(
//         'flex items-center justify-between rounded-xl px-3 py-[10px] body-1 font-semibold',
//         isSelected && 'bg-orange-500/[0.14]'
//       )}
//     >
//       <p>
//         <span className="text-orange-500">강</span>
//         {station}
//       </p>
//       {isSelected && (
//         <Check size={24} strokeWidth={4} className="rounded-full bg-orange-500 p-1.5 text-white" />
//       )}
//     </div>
//   );
// };

// const LocationStep = ({ onNext, onCancel }: LocationStepProps) => {
//   const [location, setLocation] = useState('');
//   // todo: 유효성 검증 어떻게 가져갈지? (e.g. 지하철역 list 중 하나 이상의 item 선택 시)
//   const [selectedLocation, setSelectedLocation] = useState('');

//   const handleStationClick = (station: string) => {
//     setLocation(station);
//     setSelectedLocation(station);
//   };

//   const handleNext = () => {
//     onNext(location);
//   };

//   return (
//     <StepFormLayout
//       title={`모임을 진행할 장소를\n설정해주세요`}
//       onNext={handleNext}
//       onCancel={onCancel}
//       isNextDisabled={!selectedLocation}
//     >
//       <div className="flex flex-col gap-5">
//         <Input
//           type="search"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           onClear={() => setLocation('')}
//           showClearButton
//         />
//         <div className="flex flex-col gap-3">
//           {/* todo: 추후 자동완성 로직 구상 필요 */}
//           <LocationItem station="남역" onClick={() => handleStationClick('강남역')} isSelected />
//           <LocationItem station="변역" onClick={() => handleStationClick('강변역')} />
//         </div>
//       </div>
//     </StepFormLayout>
//   );
// };

// export default LocationStep;
'use client';

import { useState, useMemo } from 'react';

import { Check } from 'lucide-react';

import Input from '@/app/_components/ui/Input';
import { cn } from '@/app/_lib/cn';
import StepFormLayout from '@/app/meetings/_components/StepFormLayout';

// 임시 역 데이터 (실제로는 별도 JSON 파일에서 import)
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
  // 더 많은 역 데이터...
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

    return STATION_DATA.filter((station) => station.name.includes(inputValue)).slice(0, 10); // 최대 10개만 표시
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

  const handleInputBlur = () => {
    // 약간의 딜레이를 줘서 클릭 이벤트가 먼저 처리되도록
    setTimeout(() => setShowResults(false), 150);
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
        <div className="relative">
          <Input
            type="search"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
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

        {/* {selectedStation && (
          <div className="rounded-xl bg-orange-50 p-4">
            <div className="flex items-center gap-2">
              <Check size={20} className="text-orange-500" />
              <p className="font-semibold text-gray-900">{selectedStation.name}</p>
            </div>
          </div>
        )} */}
      </div>
    </StepFormLayout>
  );
};

export default LocationStep;

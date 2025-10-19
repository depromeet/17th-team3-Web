import { useEffect, useMemo, useState } from 'react';

import BottomSheet from '@/app/_components/ui/BottomSheet';
import Input from '@/app/_components/ui/Input';
import { meetingsApi } from '@/app/_services/meetings';
import { Station } from '@/app/meetings/create/_models/types';

import LocationItem from './LocationItem';

interface LocationBottomSheetProps {
  isOpen: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  onStationSelect: (station: Station) => void;
  onClose: () => void;
}

const LocationBottomSheet = ({
  isOpen,
  searchValue,
  onSearchChange,
  onSearchClear,
  onStationSelect,
  onClose,
}: LocationBottomSheetProps) => {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    const getStations = async () => {
      const stations = await meetingsApi.getStations();
      setStations(stations);
    };

    getStations();
  }, []);

  const filteredStations = useMemo(() => {
    const query = searchValue.trim();
    if (!query) return [];
    return stations.filter((station: Station) => station.name.startsWith(query)).slice(0, 10);
  }, [searchValue, stations]);

  if (!isOpen) return null;

  return (
    <BottomSheet title="장소 선택" showCloseButton onClose={onClose}>
      <div className="flex h-120 flex-col gap-2">
        <Input
          type="search"
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          onClear={onSearchClear}
          showClearButton
          placeholder="지하철역을 검색해주세요"
        />

        {filteredStations.length > 0 && (
          <div className="mt-3 overflow-y-auto">
            {filteredStations.map((station) => (
              <LocationItem
                key={station.id}
                station={station}
                searchQuery={searchValue.trim()}
                onClick={() => onStationSelect(station)}
              />
            ))}
          </div>
        )}

        {searchValue && filteredStations.length === 0 && (
          <div className="mt-12 text-center text-neutral-500">검색 결과가 없습니다</div>
        )}
      </div>
    </BottomSheet>
  );
};

export default LocationBottomSheet;

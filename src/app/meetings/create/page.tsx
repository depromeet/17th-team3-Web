'use client';

import { useState, useMemo, useCallback } from 'react';

import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import { Heading } from '@/app/_components/typography';
import Badge from '@/app/_components/ui/Badge';
import BottomSheet from '@/app/_components/ui/BottomSheet';
import Button from '@/app/_components/ui/Button';
import Input from '@/app/_components/ui/Input';
import ConfirmModal from '@/app/_components/ui/Modal/ConfirmModal';
import StepperInput from '@/app/_components/ui/StepperInput';
import { cn } from '@/app/_lib/cn';
import { validateText } from '@/app/meetings/_utils/validation';
import DateTimePicker from '@/app/meetings/create/_components/DateTimePicker';
import { MEMBERS_SIZE } from '@/app/meetings/create/_models/constants';

interface Station {
  id: number;
  name: string;
}

/**
 * 모임 생성 페이지 (한 페이지 버전)
 * 모임 이름, 인원, 장소, 날짜/시간을 한 페이지에서 입력
 */
const CreatePage = () => {
  const router = useRouter();

  // Form state
  const [name, setName] = useState('');
  const [members, setMembers] = useState(MEMBERS_SIZE.MIN);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // UI state
  const [showConfirm, setShowConfirm] = useState(false);
  const [nameError, setNameError] = useState('');
  const [showLocationSheet, setShowLocationSheet] = useState(false);
  const [locationInputValue, setLocationInputValue] = useState('');

  // 모임 이름 validation
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);

    if (value.trim()) {
      const result = validateText(value.trim());
      setNameError(result.isValid ? '' : result.error);
    } else {
      setNameError('');
    }
  };

  // 장소 선택 핸들러
  const handleLocationSelect = useCallback((station: Station) => {
    setSelectedStation(station);
    setLocationInputValue(station.name);
    setShowLocationSheet(false);
  }, []);

  const handleLocationClear = useCallback(() => {
    setLocationInputValue('');
    setSelectedStation(null);
  }, []);

  const toggleLocationSheet = useCallback(() => {
    setShowLocationSheet((prev) => !prev);
  }, []);

  // 지하철역 필터링
  const filteredStations = useMemo(() => {
    const query = locationInputValue.trim();
    if (!query) return [];
    return STATION_DATA.filter((station) => station.name.startsWith(query)).slice(0, 10);
  }, [locationInputValue]);

  // 날짜 선택 핸들러
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  // 시간 선택 핸들러
  const handleTimeClick = (hour: string | null, minute: string | null) => {
    if (hour && minute) {
      setSelectedTime(`${hour}:${minute}`);
    }
  };

  // 폼 제출 가능 여부
  const isFormValid =
    name.trim() &&
    !nameError &&
    selectedStation &&
    selectedDate &&
    selectedTime &&
    members >= MEMBERS_SIZE.MIN;

  // 모임 생성 처리
  const handleSubmit = () => {
    if (!isFormValid) return;

    // TODO: API 요청
    console.log({
      name: name.trim(),
      members,
      location: selectedStation?.name,
      date: selectedDate,
      time: selectedTime,
    });

    router.push('/meetings/create/success/');
  };

  // 취소 처리
  const handleCancel = () => {
    setShowConfirm(true);
  };

  return (
    <div className="relative flex h-[100dvh] flex-col background-1">
      <TopNavigation showBackButton onLeftClick={handleCancel} />

      <header className="flex flex-col gap-3 px-5 pt-2 pb-6">
        <Badge>모임 만들기</Badge>
        <Heading as="h1">모임 정보를 입력해주세요</Heading>
      </header>

      <main className="no-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto px-5 pb-6">
        <section className="flex flex-col gap-1">
          <h3 className="label-1 text-sm font-medium text-neutral-1000">모임 이름</h3>
          <Input
            value={name}
            onChange={handleNameChange}
            onClear={() => setName('')}
            hasError={!!nameError}
            errorMessage={nameError}
            showClearButton
            maxLength={20}
            placeholder="모임명 입력"
          />
        </section>

        <section className="flex flex-col gap-1">
          <h3 className="label-1 text-sm font-medium text-neutral-1000">모임 인원</h3>
          <StepperInput value={members} onChange={setMembers} />
        </section>

        <section className="flex flex-col gap-1">
          <h3 className="label-1 text-sm font-medium text-neutral-1000">모임 장소</h3>
          <button
            type="button"
            onClick={toggleLocationSheet}
            className={cn(
              'flex w-full items-center gap-3 border-b-1 border-b-neutral-300 py-3 body-1 font-semibold transition-all duration-200',
              'text-left',
              selectedStation ? 'text-gray-1600' : 'text-neutral-500'
            )}
          >
            <MapPin size={20} strokeWidth={3} className="text-neutral-500" />
            <span>{selectedStation?.name || '지하철역으로 검색'}</span>
          </button>
        </section>

        <section className="flex flex-col gap-1">
          <h3 className="label-1 text-sm font-medium text-neutral-1000">식당 추천 시간</h3>
          <DateTimePicker
            dateValue={selectedDate}
            onDateClick={handleDateClick}
            onTimeClick={handleTimeClick}
          />
          <div className="flex items-center justify-center rounded-sm bg-orange-500/[0.08] p-3 label-2 text-xs font-medium text-neutral-700">
            식당 추천 시간까지 모임원의 식사 취향 설문이 가능합니다.
          </div>
        </section>
      </main>

      <footer className="px-5 pt-3 pb-6">
        <Button onClick={handleSubmit} status={isFormValid ? 'normal' : 'disabled'}>
          모임 생성하기
        </Button>
      </footer>

      <ConfirmModal
        isOpen={showConfirm}
        title="모임 만들기를 취소하시겠어요?"
        onConfirm={() => router.push('/')}
        onCancel={() => setShowConfirm(false)}
      />

      {/* 장소 선택 BottomSheet */}
      {showLocationSheet && (
        <BottomSheet title="장소 선택" showCloseButton onClose={toggleLocationSheet}>
          <div className="flex h-120 flex-col gap-2">
            <Input
              type="search"
              value={locationInputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocationInputValue(e.target.value)
              }
              onClear={handleLocationClear}
              showClearButton
              placeholder="지하철역을 검색해주세요"
            />

            {filteredStations.length > 0 && (
              <div className="mt-3 overflow-y-auto">
                {filteredStations.map((station) => (
                  <LocationItem
                    key={station.id}
                    station={station}
                    searchQuery={locationInputValue.trim()}
                    onClick={() => handleLocationSelect(station)}
                  />
                ))}
              </div>
            )}

            {locationInputValue && filteredStations.length === 0 && (
              <div className="mt-12 text-center text-neutral-500">검색 결과가 없습니다</div>
            )}
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

interface LocationItemProps {
  station: Station;
  searchQuery: string;
  onClick: () => void;
}

const LocationItem = ({ station, searchQuery, onClick }: LocationItemProps) => {
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const match = text.slice(0, query.length);
    const afterMatch = text.slice(query.length);

    return (
      <>
        <span className="font-bold text-orange-500">{match}</span>
        {afterMatch}
      </>
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl p-[0.625rem] text-left text-lg font-semibold transition-all duration-150 active:scale-[0.98] active:bg-orange-500/8"
    >
      {highlightText(station.name, searchQuery)}
    </button>
  );
};

const STATION_DATA: Station[] = [
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

export default CreatePage;

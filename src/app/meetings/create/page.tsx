'use client';

import { useState, useCallback } from 'react';

import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import { Heading } from '@/app/_components/typography';
import Badge from '@/app/_components/ui/Badge';
import Button from '@/app/_components/ui/Button';
import Input from '@/app/_components/ui/Input';
import ConfirmModal from '@/app/_components/ui/Modal/ConfirmModal';
import StepperInput from '@/app/_components/ui/StepperInput';
import { cn } from '@/app/_lib/cn';
import { Station } from '@/app/meetings/create/_models/types';

import DateTimePicker from './_components/DateTimePicker';
import FormSection from './_components/FormSection';
import LocationBottomSheet from './_components/LocationBottomSheet';
import { MEMBERS_SIZE } from './_models/constants';

const CreatePage = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [members, setMembers] = useState(MEMBERS_SIZE.MIN);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [showConfirm, setShowConfirm] = useState(false);
  const [showLocationSheet, setShowLocationSheet] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleLocationSheet = useCallback(() => {
    setShowLocationSheet((prev) => !prev);
  }, []);

  const handleStationSelect = useCallback((station: Station) => {
    setSelectedStation(station);
    setShowLocationSheet(false);
    setSearchValue('');
  }, []);

  const handleSearchClear = useCallback(() => {
    setSearchValue('');
  }, []);

  const handleDateClick = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const handleTimeClick = useCallback((hour: string | null) => {
    if (hour) {
      setSelectedTime(hour);
    }
  }, []);

  const isFormValid =
    name.trim() && selectedStation && selectedDate && selectedTime && members >= MEMBERS_SIZE.MIN;

  const handleSubmit = () => {
    if (!isFormValid) return;

    // TODO: API 호출로 대체 예정
    console.log({
      name: name.trim(),
      members,
      location: selectedStation?.name,
      date: selectedDate,
      time: selectedTime,
    });

    router.push('/meetings/create/success/');
  };

  const handleCancel = () => {
    setShowConfirm(true);
  };

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-y-auto background-1">
      {/* <div className="fixed w-full bg-white"> */}
      <TopNavigation showBackButton onLeftClick={handleCancel} />
      {/* </div> */}
      <header className="flex flex-col gap-3 px-5 pt-2 pb-8">
        <Badge>모임 만들기</Badge>
        <Heading as="h1">{`모임 이름과 내용을\n작성해 주세요`}</Heading>
      </header>

      <main className="no-scrollbar flex flex-1 flex-col gap-8 px-5 pb-6">
        <FormSection label="모임 이름">
          <Input
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
            onClear={() => setName('')}
            showClearButton
            maxLength={20}
            placeholder="모임명 입력"
          />
        </FormSection>

        <FormSection label="모임 인원">
          <StepperInput value={members} onChange={setMembers} />
        </FormSection>

        <FormSection label="모임 장소">
          <button
            type="button"
            onClick={toggleLocationSheet}
            className={cn(
              'flex items-center gap-2 border-b-1 border-b-neutral-300 pt-3 pb-2 body-2 font-semibold',
              selectedStation ? 'text-gray-1600' : 'text-neutral-400'
            )}
          >
            <MapPin size={20} strokeWidth={2} className="text-neutral-400" />
            <span>{selectedStation?.name || '지하철역으로 검색'}</span>
          </button>
        </FormSection>

        <FormSection label="식당 추천 시간">
          <DateTimePicker
            dateValue={selectedDate}
            onDateClick={handleDateClick}
            onTimeClick={handleTimeClick}
          />

          <div className="flex items-center justify-center rounded-sm bg-orange-500/[0.08] p-3 label-2 text-xs font-medium text-neutral-700">
            식당 추천 시간까지 모임원의 식사 취향 설문이 가능합니다.
          </div>
        </FormSection>
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

      <LocationBottomSheet
        isOpen={showLocationSheet}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchClear={handleSearchClear}
        onStationSelect={handleStationSelect}
        onClose={toggleLocationSheet}
      />
    </div>
  );
};

export default CreatePage;

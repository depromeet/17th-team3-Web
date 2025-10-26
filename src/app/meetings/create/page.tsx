'use client';

import { useState } from 'react';

import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import { Heading } from '@/app/_components/typography';
import Badge from '@/app/_components/ui/Badge';
import Button from '@/app/_components/ui/Button';
import Input from '@/app/_components/ui/Input';
import ConfirmModal from '@/app/_components/ui/Modal/ConfirmModal';
import StepperInput from '@/app/_components/ui/StepperInput';
import { useDisclosure } from '@/app/_hooks/useDisclosure';
import { useInputState } from '@/app/_hooks/useInputState';
import { cn } from '@/app/_lib/cn';
import { Station } from '@/app/meetings/create/_models/types';

import DateTimePicker from './_components/DateTimePicker';
import FormSection from './_components/FormSection';
import LocationBottomSheet from './_components/LocationBottomSheet';
import { MEMBERS_SIZE } from './_models/constants';

const CreatePage = () => {
  const router = useRouter();

  const nameInput = useInputState('');
  const [members, setMembers] = useState(MEMBERS_SIZE.MIN);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { isOpen: isLocationSheetOpen, handler: locationSheet } = useDisclosure();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    if (!isFormValid) return;

    // TODO: API 호출로 대체 예정
    console.log({
      name: nameInput.value.trim(),
      attendeeCount: members,
      stationId: selectedStation?.id,
      endAt: `${selectedDate}T${selectedTime}:00:00`,
    });

    // router.push('/meetings/create/success/');
  };

  console.log({
    name: nameInput.value.trim(),
    attendeeCount: members,
    stationId: selectedStation?.id,
    endAt: `${selectedDate}T${selectedTime}:00:00`,
  });

  const isFormValid =
    nameInput.value.trim() &&
    selectedStation &&
    selectedDate &&
    selectedTime &&
    members >= MEMBERS_SIZE.MIN;

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-y-auto background-1">
      <div className="fixed w-full bg-white">
        <TopNavigation showBackButton onLeftClick={() => setShowConfirm(true)} />
      </div>

      <header className="mt-16 flex flex-col gap-3 px-5 pt-2 pb-8 select-none">
        <Badge>모임 만들기</Badge>
        <Heading as="h1">{`모임 이름과 내용을\n작성해 주세요`}</Heading>
      </header>

      <main className="no-scrollbar flex flex-1 flex-col gap-8 px-5 pb-6">
        <FormSection label="모임 이름">
          <Input
            value={nameInput.value}
            onChange={nameInput.handleChange}
            onClear={nameInput.handleClear}
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
            onClick={() => locationSheet.toggle()}
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
          <div className="flex flex-col gap-4 pb-8">
            <DateTimePicker
              dateValue={selectedDate}
              onDateClick={(date) => setSelectedDate(date)}
              onTimeClick={(hour) => {
                if (hour) {
                  setSelectedTime(hour);
                }
              }}
            />

            <span className="flex items-center justify-center rounded-sm bg-orange-500/[0.08] p-3 label-2 text-xs font-medium text-neutral-700 select-none">
              식당 추천 시간까지 모임원의 식사 취향 설문이 가능합니다.
            </span>
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
        isOpen={isLocationSheetOpen}
        onStationSelect={setSelectedStation}
        onClose={locationSheet.close}
      />
    </div>
  );
};

export default CreatePage;

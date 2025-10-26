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
import { cn } from '@/app/_lib/cn';

import DateTimePicker from './_components/DateTimePicker';
import FormSection from './_components/FormSection';
import LocationBottomSheet from './_components/LocationBottomSheet';
import { useMeetingForm } from './_hooks/useMeetingForm';

const CreatePage = () => {
  const form = useMeetingForm();

  const [showConfirm, setShowConfirm] = useState(false);
  const { isOpen: isLocationSheetOpen, handler: locationSheet } = useDisclosure();

  const router = useRouter();

  const handleSubmit = () => {
    if (!form.isFormValid) return;

    // TODO: API 호출로 대체 예정
    console.log({
      name: form.formData.name.trim(),
      attendeeCount: form.formData.members,
      stationId: form.formData.station?.id,
      endAt: `${form.formData.date}T${form.formData.time}:00:00`,
    });

    // router.push('/meetings/create/success/');
  };

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
            value={form.formData.name}
            onChange={(event) => form.setName(event.target.value)}
            onClear={() => form.setName('')}
            showClearButton
            maxLength={20}
            placeholder="모임명 입력"
          />
        </FormSection>

        <FormSection label="모임 인원">
          <StepperInput value={form.formData.members} onChange={form.setMembers} />
        </FormSection>

        <FormSection label="모임 장소">
          <button
            type="button"
            onClick={locationSheet.toggle}
            className={cn(
              'flex items-center gap-2 border-b-1 border-b-neutral-300 pt-3 pb-2 body-2 font-semibold',
              form.formData.station ? 'text-gray-1600' : 'text-neutral-400'
            )}
          >
            <MapPin size={20} strokeWidth={2} className="text-neutral-400" />
            <span>{form.formData.station?.name || '지하철역으로 검색'}</span>
          </button>
        </FormSection>

        <FormSection label="식당 추천 시간">
          <div className="flex flex-col gap-4 pb-8">
            <DateTimePicker
              date={form.formData.date}
              time={form.formData.time}
              onDateChange={form.setDate}
              onTimeChange={form.setTime}
            />

            <span className="flex items-center justify-center rounded-sm bg-orange-500/[0.08] p-3 label-2 text-xs font-medium text-neutral-700 select-none">
              식당 추천 시간까지 모임원의 식사 취향 설문이 가능합니다.
            </span>
          </div>
        </FormSection>
      </main>

      <footer className="px-5 pt-3 pb-6">
        <Button onClick={handleSubmit} status={form.isFormValid ? 'normal' : 'disabled'}>
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
        onStationSelect={form.setStation}
        onClose={locationSheet.close}
      />
    </div>
  );
};

export default CreatePage;

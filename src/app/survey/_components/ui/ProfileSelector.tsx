'use client';

import { useState } from 'react';

import { Pencil } from 'lucide-react';
import Image from 'next/image';

import { AVATAR_OPTIONS } from '@/app/survey/_models/avatarOptions';

import ProfileSelectModal from './ProfileSelectModal';

interface ProfileSelectorProps {
  value?: string;
  onChange: (avatar: string) => void;
}

/**
 * ProfileSelector
 * - 프로필 이미지 표시 + 수정 버튼
 * - 선택 모달 연동
 */
const ProfileSelector = ({ value = 'default', onChange }: ProfileSelectorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selected = AVATAR_OPTIONS.find((a) => a.key === value) ?? AVATAR_OPTIONS[0];

  return (
    <div className="flex w-full justify-center py-5">
      {/* 프로필 영역 */}
      <div
        className="relative flex items-center justify-center rounded-full p-5"
        style={{ backgroundColor: selected.bgColor, width: 100, height: 100 }}
      >
        <Image src={selected.src} alt={selected.key} width={60} height={60} />
        {/* 수정 버튼 */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#686F7A] hover:opacity-80"
        >
          <Pencil size={16} color="white" />
        </button>
      </div>

      {/* 프로필 선택 모달 */}
      {isModalOpen && (
        <ProfileSelectModal
          open={isModalOpen}
          lockedKeys={['orange', 'grape']}
          onClose={() => setIsModalOpen(false)}
          onSelect={(key) => {
            onChange(key);
            setIsModalOpen(false);
          }}
          selectedKey={value}
        />
      )}
    </div>
  );
};

export default ProfileSelector;

'use client';

import { useEffect, useState } from 'react';

import { X } from 'lucide-react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

import BottomSheet from '@/app/_components/ui/BottomSheet';
import Button from '@/app/_components/ui/Button';
import { cn } from '@/app/_lib/cn';
import { AVATAR_OPTIONS } from '@/app/survey/_models/avatarOptions';

interface ProfileSelectModalProps {
  open: boolean;
  selectedKey?: string;
  onClose: () => void;
  onSelect: (key: string) => void;
  lockedKeys?: string[]; // 이미 다른 사용자가 선택한 프로필 목록
}

const ProfileSelectModal = ({
  open,
  selectedKey,
  onClose,
  onSelect,
  lockedKeys = [],
}: ProfileSelectModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [tempSelectedKey, setTempSelectedKey] = useState(selectedKey);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!open || !mounted) return null;

  const selectedAvatar = AVATAR_OPTIONS.find((a) => a.key === tempSelectedKey);

  const modalContent = (
    <BottomSheet onClose={onClose}>
      {/* 헤더 */}
      <div className="flex w-full items-center justify-between px-4">
        <div className="h-6 w-6" />
        <h2 className="body-3 font-semibold text-orange-700">프로필 이미지 선택</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-6 w-6 items-center justify-center text-orange-700 hover:opacity-80"
        >
          <X size={20} />
        </button>
      </div>

      {/* 선택된 프로필 미리보기 */}
      {selectedAvatar && (
        <div className="flex justify-center pt-3 pb-5">
          <div
            className={cn(
              'flex items-center justify-center rounded-full p-5 transition-transform hover:scale-105'
            )}
            style={{ backgroundColor: selectedAvatar.bgColor }}
          >
            <Image src={selectedAvatar.src} alt={selectedAvatar.key} width={60} height={60} />
          </div>
        </div>
      )}

      {/* 프로필 목록 */}
      <div className="scrollbar-hide flex flex-col gap-5 overflow-y-auto px-5">
        {Array.from({ length: Math.ceil(AVATAR_OPTIONS.length / 5) }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-3">
            {AVATAR_OPTIONS.slice(rowIdx * 5, rowIdx * 5 + 5).map((a) => {
              const isLocked = lockedKeys.includes(a.key);

              return (
                <button
                  key={a.key}
                  onClick={() => !isLocked && setTempSelectedKey(a.key)}
                  disabled={isLocked}
                  className={cn(
                    'relative flex items-center justify-center rounded-full p-3 transition-all duration-150',
                    isLocked ? 'cursor-not-allowed opacity-40' : 'hover:opacity-90 active:scale-95'
                  )}
                  style={{
                    backgroundColor: a.bgColor,
                    width: 64,
                    height: 64,
                  }}
                >
                  <Image src={a.src} alt={a.key} width={40} height={40} />
                  {tempSelectedKey === a.key && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60">
                      <Image src="/icons/check.svg" alt="선택됨" width={24} height={24} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="pt-6">
        <Button
          type="button"
          className="flex-1"
          onClick={() => {
            if (tempSelectedKey) onSelect(tempSelectedKey);
            onClose(); // 저장 버튼에서만 닫기
          }}
        >
          저장하기
        </Button>
      </div>
    </BottomSheet>
  );

  // 🔥 Portal로 body 밑으로 렌더링 (즉, SurveyLayout 전체 기준)
  const rootEl = document.getElementById('survey-layout-root') ?? document.body;
  return createPortal(modalContent, rootEl);
};

export default ProfileSelectModal;

export const TOTAL_STEPS = 4;
export const MEMBERS_SIZE = {
  MIN: 2,
  MAX: 9,
};

export const TIME_DROPDOWN_OPTION = {
  HOURS: Array.from({ length: 24 }, (_, index) => index.toString().padStart(2, '0')),
  MINUTES: ['00', '10', '20', '30', '40', '50'],
};

export const SHARE_OPTIONS = [
  { id: 'kakao', label: '카카오톡' },
  { id: 'sms', label: 'SMS' },
  { id: 'url', label: 'URL 복사' },
] as const;

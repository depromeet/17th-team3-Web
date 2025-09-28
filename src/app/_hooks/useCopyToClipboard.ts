import { useState } from 'react';

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('클립보드 기능을 제공하지 않습니다.');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn('클립보드 복사에 실패하였습니다. : ', error);
      setCopiedText(null);
      return false;
    }
  };

  return { copiedText, copy };
};

import { useCallback, useMemo } from 'react';

import confetti, { Options as ConfettiOptions } from 'canvas-confetti';

export const useConfetti = () => {
  const confettiDuration = 1000;

  const colorArray = useMemo(() => ['#3369FF', '#FFB218', '#FF4040'], []);

  const setting: ConfettiOptions = useMemo(
    () => ({
      particleCount: 100,
      spread: 100,
      origin: { y: 1.5 },
      colors: colorArray,
    }),
    [colorArray]
  );

  const getRandomInRange = useCallback((min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }, []);

  // 기존 useEffect 로직을 함수로 변환
  const celebrate = useCallback(() => {
    const confettiAnimationEnd = Date.now() + confettiDuration;

    const interval = setInterval(() => {
      const timeLeft = confettiAnimationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / confettiDuration);
      confetti({
        ...setting,
        particleCount,
        origin: {
          x: getRandomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [setting, getRandomInRange, confettiDuration]);

  return { celebrate };
};

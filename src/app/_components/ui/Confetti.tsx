'use client';

import { useEffect, useCallback, useMemo } from 'react';

import confetti, { Options as ConfettiOptions } from 'canvas-confetti';

// todo: 레이아웃 결정 후, 폭죽 효과 범위 수정 필요
const ConfettiComponent = () => {
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

  useEffect(() => {
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

  return null;
};

export default ConfettiComponent;

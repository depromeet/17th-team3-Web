'use client';

import { useEffect, useState } from 'react';

const CountdownDisplay = (endAt: string) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(endAt).getTime();
      const diff = end - now;

      if (diff <= 0) return '종료됨';

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${days}일 ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);

      if (time === '종료됨') {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endAt]);

  return <span className="text-orange-500">{timeLeft}</span>;
};

export default CountdownDisplay;

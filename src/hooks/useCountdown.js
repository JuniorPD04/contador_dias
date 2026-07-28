import { useEffect, useState } from "react";

const MS_SECOND = 1000;
const MS_MINUTE = MS_SECOND * 60;
const MS_HOUR = MS_MINUTE * 60;
const MS_DAY = MS_HOUR * 24;

function diffToParts(ms) {
  const clamped = Math.max(ms, 0);
  return {
    days: Math.floor(clamped / MS_DAY),
    hours: Math.floor((clamped % MS_DAY) / MS_HOUR),
    minutes: Math.floor((clamped % MS_HOUR) / MS_MINUTE),
    seconds: Math.floor((clamped % MS_MINUTE) / MS_SECOND),
  };
}

/**
 * Cuenta regresiva en vivo hacia `targetDate`.
 * Se actualiza cada segundo y expone si ya se llegó a la fecha.
 */
export function useCountdown(targetDate) {
  const target = new Date(targetDate).getTime();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remainingMs = target - now;
  const isFinished = remainingMs <= 0;

  return { ...diffToParts(remainingMs), isFinished, now };
}

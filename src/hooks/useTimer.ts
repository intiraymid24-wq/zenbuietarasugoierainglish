'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerReturn {
  elapsed: number;          // 経過秒数
  remaining: number | null; // 残り秒数（null = 無制限）
  isOverTime: boolean;      // 目安時間を超過したか
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export function useTimer(targetSeconds: number | null): UseTimerReturn {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setElapsed(0);
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  const reset = useCallback(() => {
    setElapsed(0);
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isRunning, clearTimer]);

  const remaining =
    targetSeconds === null ? null : Math.max(0, targetSeconds - elapsed);
  const isOverTime = targetSeconds !== null && elapsed > targetSeconds;

  return { elapsed, remaining, isOverTime, isRunning, start, stop, reset };
}

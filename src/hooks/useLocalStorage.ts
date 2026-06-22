'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) setValue(JSON.parse(item));
    } catch {
      // ignore
    }
    setLoaded(true);
  }, [key]);

  const set = (newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next = typeof newValue === 'function'
        ? (newValue as (prev: T) => T)(prev)
        : newValue;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return [value, set, loaded] as const;
}

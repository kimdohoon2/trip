import { useState, useEffect } from 'react';
import { sessionStorage } from '@/app/utils/sessionStorage';

function useSessionStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return sessionStorage.getItem(key) ?? initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export default useSessionStorage;

import { useState, useEffect } from "react";

// type ReturnType<T> = {
//   value: T;
//   setValue: React.Dispatch<T>;
// };

export function useLocalStorage<T>(defaultValue: T, key: string) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const storedValue = window.localStorage.getItem(key);
      const returnValue =
        storedValue !== null ? JSON.parse(storedValue) : defaultValue;

      return returnValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

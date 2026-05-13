import { useState, useEffect } from 'react';
import { getWaitlistCount } from '@/lib/waitlist';

export function useWaitlistCount() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(getWaitlistCount());
    const interval = setInterval(() => {
      setCount(getWaitlistCount());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return count;
}

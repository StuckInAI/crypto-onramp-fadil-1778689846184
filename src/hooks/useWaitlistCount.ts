import { useState, useEffect } from 'react';
import { getWaitlistCount } from '@/lib/waitlist';

export function useWaitlistCount(): number {
  const [count, setCount] = useState(() => getWaitlistCount());

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(getWaitlistCount());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return count;
}

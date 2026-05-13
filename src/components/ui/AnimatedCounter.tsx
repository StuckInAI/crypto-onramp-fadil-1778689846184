import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

type AnimatedCounterProps = {
  target: number;
  duration?: number;
};

export default function AnimatedCounter({ target, duration = 1200 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false });
  const prevTarget = useRef(0);

  useEffect(() => {
    if (!isInView) return;

    const start = Date.now();
    const startVal = prevTarget.current;
    const endVal = target;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startVal + (endVal - startVal) * eased));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        prevTarget.current = endVal;
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

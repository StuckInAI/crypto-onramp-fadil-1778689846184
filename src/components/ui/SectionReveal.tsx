import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type SectionRevealProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
};

export default function SectionReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 28 : direction === 'down' ? -28 : 0,
    x: direction === 'left' ? 28 : direction === 'right' ? -28 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

import styles from './TokenBadge.module.css';
import { motion } from 'framer-motion';

type TokenBadgeProps = {
  symbol: string;
  name: string;
  color: string;
  delay?: number;
};

export default function TokenBadge({ symbol, name, color, delay = 0 }: TokenBadgeProps) {
  return (
    <motion.div
      className={styles.badge}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200 }}
      style={{ '--token-color': color } as React.CSSProperties}
    >
      <span className={styles.symbol}>{symbol}</span>
      <span className={styles.name}>{name}</span>
    </motion.div>
  );
}

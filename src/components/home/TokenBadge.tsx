import { motion } from 'framer-motion';
import styles from './TokenBadge.module.css';

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
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      style={{ borderColor: `${color}30` }}
    >
      <span className={styles.dot} style={{ background: color }} />
      <span className={styles.symbol} style={{ color }}>{symbol}</span>
      <span className={styles.name}>{name}</span>
    </motion.div>
  );
}

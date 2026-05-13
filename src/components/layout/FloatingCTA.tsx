import { Link, useLocation } from 'react-router-dom';
import { useScrollY } from '@/hooks/useScrollY';
import styles from './FloatingCTA.module.css';
import clsx from 'clsx';

export default function FloatingCTA() {
  const scrollY = useScrollY();
  const location = useLocation();

  const isWaitlist = location.pathname === '/waitlist';
  const isVisible = scrollY > 400 && !isWaitlist;

  return (
    <div className={clsx(styles.wrapper, isVisible && styles.visible)}>
      <Link to="/waitlist" className={styles.btn}>
        Join the Waitlist ↗
      </Link>
    </div>
  );
}

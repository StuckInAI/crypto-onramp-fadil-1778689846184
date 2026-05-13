import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollY } from '@/hooks/useScrollY';
import styles from './FloatingCTA.module.css';

export default function FloatingCTA() {
  const location = useLocation();
  const scrollY = useScrollY();

  const isWaitlistPage = location.pathname === '/waitlist';
  const isVisible = scrollY > 400 && !isWaitlistPage;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          <Link to="/waitlist" className={styles.btn}>
            Join Waitlist
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

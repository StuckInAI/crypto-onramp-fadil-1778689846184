import clsx from 'clsx';
import styles from './GlassCard.module.css';

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: 'green' | 'purple' | 'cyan' | 'none';
  onClick?: () => void;
};

export default function GlassCard({ children, className, glow = 'none', onClick }: GlassCardProps) {
  return (
    <div
      className={clsx(
        styles.card,
        glow === 'green' && styles.glowGreen,
        glow === 'purple' && styles.glowPurple,
        glow === 'cyan' && styles.glowCyan,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

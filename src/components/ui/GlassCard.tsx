import clsx from 'clsx';
import styles from './GlassCard.module.css';

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: 'green' | 'purple' | 'blue' | 'none' | 'cyan';
  onClick?: () => void;
};

export default function GlassCard({ children, className, glow = 'none', onClick }: GlassCardProps) {
  return (
    <div
      className={clsx(
        styles.card,
        glow === 'green' && styles.glowGreen,
        glow === 'purple' && styles.glowPurple,
        glow === 'blue' && styles.glowBlue,
        glow === 'cyan' && styles.glowCyan,
        onClick && styles.clickable,
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
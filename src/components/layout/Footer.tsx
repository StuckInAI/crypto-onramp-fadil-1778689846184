import { Link } from 'react-router-dom';
import { Twitter, Send, Instagram } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoMark}>S</span>
            <span className={styles.logoText}>SLING</span>
          </Link>
          <p className={styles.tagline}>
            Pakistan's gateway to the world of crypto. Fast, secure, and local.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Twitter" className={styles.socialIcon}><Twitter size={18} /></a>
            <a href="#" aria-label="Telegram" className={styles.socialIcon}><Send size={18} /></a>
            <a href="#" aria-label="Instagram" className={styles.socialIcon}><Instagram size={18} /></a>
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Navigation</h4>
            <Link to="/" className={styles.link}>Home</Link>
            <Link to="/about" className={styles.link}>About</Link>
            <Link to="/faq" className={styles.link}>FAQ</Link>
            <Link to="/contact" className={styles.link}>Contact</Link>
            <Link to="/waitlist" className={styles.link}>Join Waitlist</Link>
          </div>

          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Supported Assets</h4>
            {['BTC', 'ETH', 'USDT'].map((token) => (
              <span key={token} className={styles.token}>{token}</span>
            ))}
          </div>

          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Payment Methods</h4>
            <div className={styles.paymentBadge} style={{ color: 'var(--color-green)' }}>JazzCash</div>
            <div className={styles.paymentBadge} style={{ color: 'var(--color-cyan)' }}>EasyPaisa</div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Sling Technologies. All rights reserved.
        </p>
        <p className={styles.disclaimer}>
          Crypto investments carry risk. Not financial advice.
        </p>
      </div>
    </footer>
  );
}

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useScrollY } from '@/hooks/useScrollY';
import Logo from '@/components/ui/Logo';
import styles from './Navbar.module.css';
import clsx from 'clsx';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollY();
  const location = useLocation();

  const isScrolled = scrollY > 20;

  return (
    <header className={clsx(styles.navbar, isScrolled && styles.scrolled)}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <Logo size={32} />
          <span className={styles.logoText}>SLING</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={clsx(
                styles.navLink,
                location.pathname === link.href && styles.activeLink
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.navActions}>
          <Link to="/waitlist" className={styles.ctaBtn}>
            Join Waitlist
          </Link>
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={clsx(
                styles.mobileLink,
                location.pathname === link.href && styles.activeLink
              )}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/waitlist"
            className={styles.mobileCta}
            onClick={() => setMenuOpen(false)}
          >
            Join Waitlist
          </Link>
        </div>
      )}
    </header>
  );
}
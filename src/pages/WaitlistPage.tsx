import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Share2, ArrowRight } from 'lucide-react';
import { addToWaitlist, getWaitlistStatus } from '@/lib/waitlist';
import SectionReveal from '@/components/ui/SectionReveal';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import styles from './WaitlistPage.module.css';
import type { WaitlistEntry } from '@/types';

function generateReferralUrl(code: string): string {
  return `${window.location.origin}/waitlist?ref=${code}`;
}

export default function WaitlistPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [refCode, setRefCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successEntry, setSuccessEntry] = useState<WaitlistEntry | null>(null);
  const [copied, setCopied] = useState(false);
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookedUpEntry, setLookedUpEntry] = useState<WaitlistEntry | null>(null);
  const [lookupError, setLookupError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) setRefCode(ref);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const { entry } = addToWaitlist(name.trim(), email.trim(), `+92${phone.trim()}`, refCode || undefined);
      setSuccessEntry(entry);
      setLoading(false);
    }, 900);
  };

  const handleCopy = () => {
    if (!successEntry) return;
    navigator.clipboard.writeText(generateReferralUrl(successEntry.referralCode));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLookup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLookupError('');
    const entry = getWaitlistStatus(lookupEmail.trim());
    if (entry) {
      setLookedUpEntry(entry);
    } else {
      setLookupError('No waitlist entry found for this email.');
    }
  };

  const referralUrl = successEntry ? generateReferralUrl(successEntry.referralCode) : '';
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Join me on Sling — Pakistan's crypto on-ramp! Use my referral link: ${referralUrl}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just joined the @SlingPK waitlist — Pakistan's gateway to crypto! 🚀 Join with my link:`)} &url=${encodeURIComponent(referralUrl)}`;

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div className={styles.headerGlow} aria-hidden="true" />
        <div className={styles.headerContent}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Early Access
          </motion.span>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Join the{' '}
            <span className="gradient-text-green">Sling Waitlist</span>
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Be among the first to experience Pakistan's crypto on-ramp. Refer friends to move up the queue.
          </motion.p>
        </div>
      </section>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {!successEntry ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              className={styles.formWrapper}
            >
              <GlassCard className={styles.formCard} glow="green">
                <h2 className={styles.formTitle}>Secure your spot</h2>
                <p className={styles.formSub}>Complete your profile to join the waitlist.</p>

                {refCode && (
                  <div className={styles.refNotice}>
                    🎉 You were referred! Your friend will move up the queue when you sign up.
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  <div className={styles.field}>
                    <label className={styles.label2} htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      placeholder="Ahmed Khan"
                      className={styles.input}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label2} htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      placeholder="ahmed@example.com"
                      className={styles.input}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label2} htmlFor="phone">Phone Number</label>
                    <div className={styles.phoneRow}>
                      <span className={styles.phonePrefix}>+92</span>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                        placeholder="3001234567"
                        className={`${styles.input} ${styles.phoneInput}`}
                        autoComplete="tel"
                        required
                      />
                    </div>
                  </div>

                  {error && <p className={styles.errorMsg}>{error}</p>}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? 'Joining...' : <>Join Waitlist <ArrowRight size={18} /></>}
                  </Button>
                </form>
              </GlassCard>

              {/* Lookup section */}
              <SectionReveal delay={0.2}>
                <GlassCard className={styles.lookupCard}>
                  <h3 className={styles.lookupTitle}>Already signed up?</h3>
                  <p className={styles.lookupSub}>Check your position and referral link.</p>
                  <form onSubmit={handleLookup} className={styles.lookupForm}>
                    <input
                      type="email"
                      value={lookupEmail}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLookupEmail(e.target.value)}
                      placeholder="Your email address"
                      className={styles.input}
                    />
                    <Button type="submit" variant="ghost" size="md">
                      Check Status
                    </Button>
                  </form>
                  {lookupError && <p className={styles.errorMsg}>{lookupError}</p>}
                  {lookedUpEntry && (
                    <div className={styles.lookupResult}>
                      <div className={styles.statRow}>
                        <div className={styles.stat}>
                          <span className={styles.statNum}>#{lookedUpEntry.position}</span>
                          <span className={styles.statLabel}>Queue Position</span>
                        </div>
                        <div className={styles.stat}>
                          <span className={styles.statNum}>{lookedUpEntry.referralCount}</span>
                          <span className={styles.statLabel}>Referrals</span>
                        </div>
                      </div>
                      <div className={styles.refLinkBox}>
                        <span className={styles.refLinkText}>{generateReferralUrl(lookedUpEntry.referralCode)}</span>
                        <button
                          type="button"
                          onClick={() => { navigator.clipboard.writeText(generateReferralUrl(lookedUpEntry.referralCode)); }}
                          className={styles.copyBtn}
                          aria-label="Copy referral link"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </GlassCard>
              </SectionReveal>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.successWrapper}
            >
              <GlassCard className={styles.successCard} glow="green">
                <div className={styles.successIcon}>🎉</div>
                <h2 className={styles.successTitle}>You're on the list!</h2>
                <p className={styles.successSub}>
                  Welcome to Sling, <strong>{successEntry.name}</strong>. We'll notify you at{' '}
                  <strong>{successEntry.email}</strong> when you get access.
                </p>

                <div className={styles.statsRow}>
                  <div className={styles.statBox}>
                    <span className={styles.statBig}>#{successEntry.position}</span>
                    <span className={styles.statSmall}>Your Position</span>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.statBox}>
                    <span className={styles.statBig}>{successEntry.referralCount}</span>
                    <span className={styles.statSmall}>Referrals</span>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.statBox}>
                    <span className={styles.statBig} style={{ color: 'var(--color-green)', fontSize: '14px' }}>{successEntry.referralCode}</span>
                    <span className={styles.statSmall}>Your Code</span>
                  </div>
                </div>

                <div className={styles.referralSection}>
                  <p className={styles.referralTitle}>
                    <Share2 size={16} /> Refer friends to move up
                  </p>
                  <p className={styles.referralHint}>Each referral moves you up 5 positions!</p>
                  <div className={styles.refLinkBox}>
                    <span className={styles.refLinkText}>{referralUrl}</span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={styles.copyBtn}
                      aria-label="Copy referral link"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>

                  <div className={styles.shareRow}>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareBtn}
                      style={{ background: '#25D366', color: 'white' }}
                    >
                      WhatsApp
                    </a>
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shareBtn}
                      style={{ background: '#1DA1F2', color: 'white' }}
                    >
                      Twitter / X
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={`${styles.shareBtn} ${styles.shareBtnGhost}`}
                    >
                      {copied ? '✓ Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

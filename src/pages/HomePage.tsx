import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield, Zap, Globe, TrendingUp } from 'lucide-react';
import HeroBackground from '@/components/home/HeroBackground';
import TokenBadge from '@/components/home/TokenBadge';
import SectionReveal from '@/components/ui/SectionReveal';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useWaitlistCount } from '@/hooks/useWaitlistCount';
import styles from './HomePage.module.css';

const TOKENS = [
  { symbol: 'BTC', name: 'Bitcoin', color: '#F7931A' },
  { symbol: 'ETH', name: 'Ethereum', color: '#627EEA' },
  { symbol: 'USDT', name: 'Tether', color: '#26A17B' },
];

const STEPS = [
  {
    icon: '💳',
    step: '01',
    title: 'Pay Locally',
    desc: 'Send PKR via JazzCash or EasyPaisa to Sling — no bank account required.',
    color: 'var(--color-green)',
  },
  {
    icon: '⚡',
    step: '02',
    title: 'Sling Converts',
    desc: 'We instantly convert your PKR to crypto at the best available market rate.',
    color: 'var(--color-purple)',
  },
  {
    icon: '📈',
    step: '03',
    title: 'You Trade',
    desc: 'Track, trade, and manage your BTC, ETH, and USDT from your Sling dashboard.',
    color: 'var(--color-cyan)',
  },
];

const FEATURES = [
  { icon: <Shield size={24} />, title: 'Secure & Verified', desc: 'Bank-grade encryption with full KYC compliance.' },
  { icon: <Zap size={24} />, title: 'Instant Conversion', desc: 'Real-time rates with zero hidden fees.' },
  { icon: <Globe size={24} />, title: 'Built for Pakistan', desc: 'JazzCash, EasyPaisa — payment methods you already use.' },
  { icon: <TrendingUp size={24} />, title: 'Trade & Earn', desc: 'Full trading dashboard coming at launch.' },
];

export default function HomePage() {
  const waitlistCount = useWaitlistCount();
  const displayCount = Math.max(waitlistCount, 2847);

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <HeroBackground />
        <div className={styles.heroGradient} aria-hidden="true" />
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.heroBadge}
          >
            <span className={styles.heroBadgeDot} />
            Now accepting waitlist signups
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Pakistan's{' '}
            <span className="gradient-text-green">Gateway</span>
            <br />
            to Crypto
          </motion.h1>

          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Buy BTC, ETH & USDT with JazzCash or EasyPaisa.
            <br />
            No bank. No hassle. Just Sling.
          </motion.p>

          <motion.div
            className={styles.heroActions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/waitlist" className={styles.primaryBtn}>
              Join the Waitlist <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className={styles.secondaryBtn}>
              Learn More <ChevronDown size={18} />
            </a>
          </motion.div>

          <motion.div
            className={styles.tokenRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {TOKENS.map((t, i) => (
              <TokenBadge key={t.symbol} {...t} delay={0.5 + i * 0.1} />
            ))}
          </motion.div>

          <motion.p
            className={styles.counterText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className={styles.counterNum}>
              <AnimatedCounter target={displayCount} />
            </span>{' '}
            people already on the waitlist
          </motion.p>
        </div>

        <a href="#how-it-works" className={styles.scrollHint} aria-label="Scroll to how it works">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <ChevronDown size={24} color="var(--color-text-muted)" />
          </motion.div>
        </a>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className={styles.section}>
        <SectionReveal>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>How It Works</span>
            <h2 className={styles.sectionTitle}>Three steps to crypto freedom</h2>
            <p className={styles.sectionSub}>From PKR in your pocket to crypto in your wallet — in minutes.</p>
          </div>
        </SectionReveal>

        <div className={styles.stepsGrid}>
          {STEPS.map((step, i) => (
            <SectionReveal key={step.step} delay={i * 0.15}>
              <GlassCard className={styles.stepCard} glow="green">
                <div className={styles.stepNumber} style={{ color: step.color }}>{step.step}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle} style={{ color: step.color }}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
                <div className={styles.stepLine} style={{ background: step.color }} />
              </GlassCard>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className={styles.paymentSection}>
        <SectionReveal>
          <div className={styles.paymentInner}>
            <p className={styles.paymentLabel}>Accepted Payment Methods</p>
            <div className={styles.paymentBadges}>
              <div className={styles.paymentBadge} style={{ color: 'var(--color-green)', borderColor: 'var(--color-green)' }}>
                JazzCash
              </div>
              <div className={styles.paymentBadge} style={{ color: 'var(--color-cyan)', borderColor: 'var(--color-cyan)' }}>
                EasyPaisa
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Features */}
      <section className={styles.section}>
        <SectionReveal>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Why Sling</span>
            <h2 className={styles.sectionTitle}>Built for every Pakistani</h2>
          </div>
        </SectionReveal>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <SectionReveal key={f.title} delay={i * 0.1}>
              <GlassCard className={styles.featureCard} glow="purple">
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </GlassCard>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <SectionReveal>
          <div className={styles.ctaBannerInner}>
            <div className={styles.ctaBannerGlow} aria-hidden="true" />
            <h2 className={styles.ctaBannerTitle}>Ready to join the future of finance?</h2>
            <p className={styles.ctaBannerSub}>Secure your spot on the waitlist today.</p>
            <Link to="/waitlist" className={styles.primaryBtn}>
              Get Early Access <ArrowRight size={18} />
            </Link>
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}

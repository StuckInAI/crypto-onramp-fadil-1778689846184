import { motion } from 'framer-motion';
import { Shield, Zap, Globe, DollarSign, Users, Lock } from 'lucide-react';
import SectionReveal from '@/components/ui/SectionReveal';
import GlassCard from '@/components/ui/GlassCard';
import styles from './AboutPage.module.css';

const WHY_FEATURES = [
  { icon: <Globe size={22} />, title: 'Local Payments', desc: 'JazzCash and EasyPaisa are already in millions of Pakistani hands. We meet you where you are.', color: 'var(--color-green)' },
  { icon: <Zap size={22} />, title: 'Instant Conversion', desc: 'Your PKR becomes crypto in seconds, not days. No waiting, no delays.', color: 'var(--color-purple)' },
  { icon: <Lock size={22} />, title: 'Secure Trading', desc: 'Multi-layer security with full KYC verification and AML compliance.', color: 'var(--color-cyan)' },
  { icon: <DollarSign size={22} />, title: 'PKR Friendly', desc: 'All rates and prices displayed in PKR with competitive conversion fees.', color: 'var(--color-green)' },
  { icon: <Users size={22} />, title: 'Community First', desc: 'Built by Pakistanis, for Pakistanis. We understand the local market.', color: 'var(--color-purple)' },
  { icon: <Shield size={22} />, title: 'Regulated & Safe', desc: 'Compliant with Pakistani financial regulations and international crypto standards.', color: 'var(--color-cyan)' },
];

const TEAM = [
  { name: 'CEO & Co-Founder', initials: 'AF', role: 'Fintech & Blockchain Specialist' },
  { name: 'CTO & Co-Founder', initials: 'SM', role: 'Full-Stack & Smart Contract Engineer' },
  { name: 'Head of Operations', initials: 'RK', role: 'Pakistani Market & Payments Expert' },
  { name: 'Head of Design', initials: 'NA', role: 'Product Design & UX Lead' },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* Page header */}
      <section className={styles.header}>
        <div className={styles.headerGlow} aria-hidden="true" />
        <div className={styles.headerContent}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            About Sling
          </motion.span>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We're building Pakistan's{' '}
            <span className="gradient-text-purple">crypto future</span>
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Sling is on a mission to make crypto accessible to every Pakistani through local payment infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.section}>
        <div className={styles.missionGrid}>
          <SectionReveal>
            <div className={styles.missionText}>
              <span className={styles.sectionLabel}>The Problem</span>
              <h2 className={styles.missionTitle}>Crypto is hard to access in Pakistan</h2>
              <p className={styles.missionDesc}>
                Over 220 million Pakistanis remain largely excluded from the global crypto economy.
                Traditional on-ramps require international bank accounts, credit cards, or complex P2P arrangements —
                all of which come with high friction, high fees, and high risk.
              </p>
              <p className={styles.missionDesc}>
                Meanwhile, mobile money is booming. JazzCash and EasyPaisa have tens of millions of active users.
                The infrastructure exists — the bridge doesn't.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <GlassCard className={styles.solutionCard} glow="green">
              <span className={styles.sectionLabel} style={{ color: 'var(--color-green)' }}>The Solution</span>
              <h3 className={styles.solutionTitle}>Sling bridges local money with global crypto</h3>
              <ul className={styles.solutionList}>
                <li>✅ Pay with JazzCash or EasyPaisa</li>
                <li>✅ Sling converts your PKR instantly</li>
                <li>✅ Receive BTC, ETH, or USDT in your wallet</li>
                <li>✅ Trade, track, and sell from your dashboard</li>
                <li>✅ Withdraw back to your mobile wallet</li>
              </ul>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      {/* Why Sling */}
      <section className={styles.section}>
        <SectionReveal>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Why Sling</span>
            <h2 className={styles.sectionTitle}>Everything you need, nothing you don't</h2>
          </div>
        </SectionReveal>
        <div className={styles.featuresGrid}>
          {WHY_FEATURES.map((f, i) => (
            <SectionReveal key={f.title} delay={i * 0.08}>
              <GlassCard className={styles.featureCard} glow="purple">
                <div className={styles.featureIcon} style={{ color: f.color, background: `${f.color}18` }}>
                  {f.icon}
                </div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </GlassCard>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className={styles.section}>
        <SectionReveal>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>The Team</span>
            <h2 className={styles.sectionTitle}>Built by believers</h2>
            <p className={styles.sectionSub}>Passionate about finance, technology, and Pakistan.</p>
          </div>
        </SectionReveal>
        <div className={styles.teamGrid}>
          {TEAM.map((member, i) => (
            <SectionReveal key={member.name} delay={i * 0.1}>
              <GlassCard className={styles.teamCard} glow="cyan">
                <div className={styles.teamAvatar}>{member.initials}</div>
                <h3 className={styles.teamName}>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
              </GlassCard>
            </SectionReveal>
          ))}
        </div>
      </section>
    </main>
  );
}

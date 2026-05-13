import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQPage.module.css';
import SectionReveal from '@/components/ui/SectionReveal';

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

const faqs: FAQItem[] = [
  {
    category: 'General',
    question: 'What is Sling?',
    answer: 'Sling is Pakistan\'s first dedicated crypto on-ramp platform, allowing you to buy Bitcoin, Ethereum, and USDT using local payment methods like JazzCash and EasyPaisa.',
  },
  {
    category: 'General',
    question: 'Is Sling legal in Pakistan?',
    answer: 'We operate in compliance with applicable Pakistani regulations and continuously monitor regulatory developments. We work closely with legal advisors to ensure our service remains compliant.',
  },
  {
    category: 'General',
    question: 'Which cryptocurrencies can I buy?',
    answer: 'At launch, Sling will support Bitcoin (BTC), Ethereum (ETH), and Tether (USDT). We plan to expand our supported assets based on user demand.',
  },
  {
    category: 'Payments',
    question: 'What payment methods are supported?',
    answer: 'We support JazzCash and EasyPaisa mobile wallets, as well as major Pakistani bank transfers. We are continuously working to add more payment options.',
  },
  {
    category: 'Payments',
    question: 'What are the transaction fees?',
    answer: 'Sling charges a competitive flat fee plus a small percentage spread. Our fee structure is transparent with no hidden charges. Exact fee details will be published at launch.',
  },
  {
    category: 'Payments',
    question: 'What are the minimum and maximum transaction limits?',
    answer: 'Minimum transactions start at PKR 1,000. Maximum limits depend on your verification level, ranging from PKR 50,000 for basic verification to PKR 500,000+ for fully verified accounts.',
  },
  {
    category: 'Security',
    question: 'How does Sling keep my funds safe?',
    answer: 'Sling does not hold your crypto. Once you purchase, assets are sent directly to your wallet. We use bank-grade encryption for all personal and financial data.',
  },
  {
    category: 'Security',
    question: 'What KYC documents are required?',
    answer: 'We require a valid Pakistani CNIC (National Identity Card) for identity verification. Additional documents may be required for higher transaction limits.',
  },
  {
    category: 'Security',
    question: 'Is my personal data secure?',
    answer: 'Yes. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. We never sell your personal data to third parties.',
  },
  {
    category: 'Getting Started',
    question: 'How do I join the waitlist?',
    answer: 'Simply click the "Join Waitlist" button on our homepage or navigate to the Waitlist page. Enter your email address and you will be notified as soon as we launch.',
  },
  {
    category: 'Getting Started',
    question: 'When will Sling launch?',
    answer: 'We are targeting a launch in 2025. Waitlist members will get early access and may receive exclusive benefits. Stay tuned for updates!',
  },
  {
    category: 'Getting Started',
    question: 'Do I need a crypto wallet to use Sling?',
    answer: 'Yes, you will need a crypto wallet address to receive your purchased cryptocurrency. We recommend using reputable wallets like MetaMask for ETH or Trust Wallet for multi-asset support.',
  },
];

const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <SectionReveal delay={index * 0.05}>
      <div className={styles.faqItem}>
        <button
          className={styles.faqQuestion}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <span>{item.question}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={styles.chevron}
          >
            <ChevronDown size={20} />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={styles.faqAnswer}
            >
              <p>{item.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <SectionReveal>
          <div className={styles.badge}>Help Center</div>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.subtitle}>
            Everything you need to know about Sling. Can\'t find an answer?
            {' '}<a href="/contact" className={styles.contactLink}>Contact us</a>.
          </p>
        </SectionReveal>
      </section>

      <section className={styles.content}>
        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.faqList}>
          {filtered.map((item, i) => (
            <FAQAccordion key={item.question} item={item} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

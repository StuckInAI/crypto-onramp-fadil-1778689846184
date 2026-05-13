import { useState } from 'react';
import { Send, Mail, MessageSquare } from 'lucide-react';
import SectionReveal from '@/components/ui/SectionReveal';
import Button from '@/components/ui/Button';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <SectionReveal>
          <div className={styles.badge}>Get In Touch</div>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            Have questions or feedback? We would love to hear from you.
          </p>
        </SectionReveal>
      </section>

      <section className={styles.content}>
        <SectionReveal>
          <div className={styles.grid}>
            <div className={styles.info}>
              <h2 className={styles.infoTitle}>Let us talk</h2>
              <p className={styles.infoText}>
                Whether you have a question about features, pricing, or anything else,
                our team is ready to answer all your questions.
              </p>
              <div className={styles.contactItems}>
                <div className={styles.contactItem}>
                  <Mail size={20} className={styles.icon} />
                  <span>hello@sling.pk</span>
                </div>
                <div className={styles.contactItem}>
                  <MessageSquare size={20} className={styles.icon} />
                  <span>Live chat coming soon</span>
                </div>
              </div>
            </div>

            <div className={styles.formWrapper}>
              {submitted ? (
                <div className={styles.success}>
                  <Send size={40} className={styles.successIcon} />
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.field}>
                    <label className={styles.label}>Name</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                      className={styles.input}
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Message</label>
                    <textarea
                      className={styles.textarea}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" fullWidth>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </SectionReveal>
      </section>
    </main>
  );
}

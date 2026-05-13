export type WaitlistEntry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  referredBy: string | null;
  referralCount: number;
  position: number;
  createdAt: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ContactForm = {
  name: string;
  email: string;
  message: string;
};

export type WaitlistForm = {
  name: string;
  email: string;
  phone: string;
  referralCode?: string;
};

export type NavLink = {
  label: string;
  href: string;
};

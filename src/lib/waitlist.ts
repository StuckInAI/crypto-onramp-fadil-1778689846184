import type { WaitlistEntry } from '@/types';

const STORAGE_KEY = 'sling_waitlist';

function generateReferralCode(name: string): string {
  const base = name.replace(/\s+/g, '').toUpperCase().slice(0, 4);
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SLG-${base}${rand}`;
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getWaitlist(): WaitlistEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as WaitlistEntry[];
  } catch {
    return [];
  }
}

function saveWaitlist(entries: WaitlistEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addToWaitlist(
  name: string,
  email: string,
  phone: string,
  referredByCode?: string
): { entry: WaitlistEntry; isNew: boolean } {
  const entries = getWaitlist();

  const existing = entries.find((e) => e.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { entry: existing, isNew: false };
  }

  const referralCode = generateReferralCode(name);
  const position = entries.length + 1;

  const newEntry: WaitlistEntry = {
    id: generateId(),
    name,
    email,
    phone,
    referralCode,
    referredBy: referredByCode || null,
    referralCount: 0,
    position,
    createdAt: new Date().toISOString(),
  };

  let updatedEntries = [...entries, newEntry];

  if (referredByCode) {
    updatedEntries = updatedEntries.map((e) => {
      if (e.referralCode === referredByCode) {
        const newCount = e.referralCount + 1;
        const boost = 5;
        const newPosition = Math.max(1, e.position - boost);
        return { ...e, referralCount: newCount, position: newPosition };
      }
      return e;
    });

    updatedEntries = updatedEntries
      .sort((a, b) => a.position - b.position)
      .map((e, i) => ({ ...e, position: i + 1 }));
  }

  saveWaitlist(updatedEntries);

  const saved = updatedEntries.find((e) => e.email === email);
  return { entry: saved || newEntry, isNew: true };
}

export function getWaitlistStatus(email: string): WaitlistEntry | null {
  const entries = getWaitlist();
  return entries.find((e) => e.email.toLowerCase() === email.toLowerCase()) || null;
}

export function getWaitlistCount(): number {
  return getWaitlist().length;
}

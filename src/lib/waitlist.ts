import type { WaitlistEntry } from '@/types';

const STORAGE_KEY = 'sling_waitlist';

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'SLG-';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function loadEntries(): WaitlistEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: WaitlistEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addToWaitlist(
  name: string,
  email: string,
  phone: string,
  referredBy?: string
): { entry: WaitlistEntry; alreadyExists: boolean } {
  const entries = loadEntries();

  const existing = entries.find((e) => e.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { entry: existing, alreadyExists: true };
  }

  let referralCode = generateCode();
  while (entries.find((e) => e.referralCode === referralCode)) {
    referralCode = generateCode();
  }

  const newEntry: WaitlistEntry = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    referralCode,
    referredBy: referredBy || null,
    referralCount: 0,
    position: entries.length + 1,
    createdAt: new Date().toISOString(),
  };

  const updatedEntries = [...entries, newEntry];

  if (referredBy) {
    const referrerIdx = updatedEntries.findIndex(
      (e) => e.referralCode === referredBy && e.id !== newEntry.id
    );
    if (referrerIdx !== -1) {
      updatedEntries[referrerIdx] = {
        ...updatedEntries[referrerIdx],
        referralCount: updatedEntries[referrerIdx].referralCount + 1,
        position: Math.max(1, updatedEntries[referrerIdx].position - 5),
      };
    }
  }

  saveEntries(updatedEntries);
  return { entry: newEntry, alreadyExists: false };
}

export function getWaitlistStatus(email: string): WaitlistEntry | null {
  const entries = loadEntries();
  return entries.find((e) => e.email.toLowerCase() === email.toLowerCase()) || null;
}

export function getWaitlistCount(): number {
  return loadEntries().length;
}

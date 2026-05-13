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

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

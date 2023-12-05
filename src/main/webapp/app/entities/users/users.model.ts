import dayjs from 'dayjs/esm';

export interface IUsers {
  id: number;
  name?: string | null;
  photo?: string | null;
  zip?: string | null;
  city?: string | null;
  country?: string | null;
  address?: string | null;
  phone?: string | null;
  fax?: string | null;
  email?: string | null;
  password?: string | null;
  rememberToken?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  isProvider?: boolean | null;
  status?: boolean | null;
  verificationLink?: string | null;
  emailVerified?: string | null;
  affilateCode?: string | null;
  affilateIncome?: number | null;
  shopName?: string | null;
  ownerName?: string | null;
  shopNumber?: string | null;
  shopAddress?: string | null;
  regNumber?: string | null;
  shopMessage?: string | null;
  shopDetails?: string | null;
  shopImage?: string | null;
  fUrl?: string | null;
  gUrl?: string | null;
  tUrl?: string | null;
  lUrl?: string | null;
  isVendor?: boolean | null;
  fCheck?: boolean | null;
  gCheck?: boolean | null;
  tCheck?: boolean | null;
  lCheck?: boolean | null;
  mailSent?: boolean | null;
  shippingCost?: number | null;
  currentBalance?: number | null;
  date?: dayjs.Dayjs | null;
  ban?: boolean | null;
  isPrinter?: boolean | null;
}

export type NewUsers = Omit<IUsers, 'id'> & { id: null };

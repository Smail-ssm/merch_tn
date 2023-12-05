import dayjs from 'dayjs/esm';

export interface IAdmins {
  id: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  role?: string | null;
  photo?: string | null;
  password?: string | null;
  status?: boolean | null;
  rememberToken?: string | null;
  createdat?: dayjs.Dayjs | null;
  updatedat?: dayjs.Dayjs | null;
  shopName?: string | null;
}

export type NewAdmins = Omit<IAdmins, 'id'> & { id: null };

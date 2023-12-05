import dayjs from 'dayjs/esm';

import { IAdmins, NewAdmins } from './admins.model';

export const sampleWithRequiredData: IAdmins = {
  id: 4857,
  name: 'ick frenetically likewise',
  email: 'Rick_Schaden@yahoo.com',
  phone: '677-208-0780',
  password: 'apple',
  status: true,
};

export const sampleWithPartialData: IAdmins = {
  id: 18857,
  name: 'psst insist ugh',
  email: 'Kaylee_Prosacco@hotmail.com',
  phone: '492.926.8410 x1167',
  role: 'whose fatherly geez',
  photo: 'till oddball',
  password: 'enlightened crowded',
  status: false,
  createdat: dayjs('2023-12-02T16:44'),
  shopName: 'meh',
};

export const sampleWithFullData: IAdmins = {
  id: 29195,
  name: 'fairly into linear',
  email: 'Maritza.Thiel@hotmail.com',
  phone: '547.896.8129 x44498',
  role: 'land off',
  photo: 'psst serum',
  password: 'fluid veto provided',
  status: true,
  rememberToken: 'as parallel dial',
  createdat: dayjs('2023-12-02T09:13'),
  updatedat: dayjs('2023-12-01T19:00'),
  shopName: 'than near underneath',
};

export const sampleWithNewData: NewAdmins = {
  name: 'hm vice',
  email: 'Jerald99@hotmail.com',
  phone: '1-395-515-1260',
  password: 'parched ugh',
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

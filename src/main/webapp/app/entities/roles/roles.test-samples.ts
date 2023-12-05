import { IRoles, NewRoles } from './roles.model';

export const sampleWithRequiredData: IRoles = {
  id: 4314,
};

export const sampleWithPartialData: IRoles = {
  id: 23268,
};

export const sampleWithFullData: IRoles = {
  id: 21727,
  name: 'polite',
  section: 'brush serval intensely',
};

export const sampleWithNewData: NewRoles = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

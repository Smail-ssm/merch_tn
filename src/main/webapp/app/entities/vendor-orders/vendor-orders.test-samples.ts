import { IVendorOrders, NewVendorOrders } from './vendor-orders.model';

export const sampleWithRequiredData: IVendorOrders = {
  id: 30,
  userId: 8574,
  orderId: 20459,
  qty: 24704,
  price: 3534.28,
  orderNumber: 'because truthfully',
  status: 'phony',
};

export const sampleWithPartialData: IVendorOrders = {
  id: 15667,
  userId: 28662,
  orderId: 23533,
  qty: 6244,
  price: 31689.11,
  orderNumber: 'absentmindedly sadly oof',
  status: 'present inasmuch tall',
};

export const sampleWithFullData: IVendorOrders = {
  id: 2641,
  userId: 12145,
  orderId: 24710,
  qty: 7959,
  price: 6689.9,
  orderNumber: 'swamp burrito',
  status: 'spite yum',
};

export const sampleWithNewData: NewVendorOrders = {
  userId: 8854,
  orderId: 12645,
  qty: 31729,
  price: 23977.12,
  orderNumber: 'dehydrate',
  status: 'after apud athwart',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

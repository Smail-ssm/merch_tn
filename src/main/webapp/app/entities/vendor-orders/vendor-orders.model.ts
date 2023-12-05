export interface IVendorOrders {
  id: number;
  userId?: number | null;
  orderId?: number | null;
  qty?: number | null;
  price?: number | null;
  orderNumber?: string | null;
  status?: string | null;
}

export type NewVendorOrders = Omit<IVendorOrders, 'id'> & { id: null };

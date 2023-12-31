import dayjs from 'dayjs/esm';

export interface IProducts {
  id: number;
  sku?: string | null;
  productType?: string | null;
  affiliateLink?: string | null;
  userId?: number | null;
  categoryId?: number | null;
  subcategoryId?: number | null;
  childcategoryId?: number | null;
  attributes?: string | null;
  name?: string | null;
  slug?: string | null;
  photo?: string | null;
  thumbnail?: string | null;
  file?: string | null;
  size?: string | null;
  sizeQty?: string | null;
  sizePrice?: string | null;
  color?: string | null;
  price?: number | null;
  previousPrice?: number | null;
  details?: string | null;
  stock?: number | null;
  policy?: string | null;
  status?: number | null;
  views?: number | null;
  tags?: string | null;
  features?: string | null;
  colors?: string | null;
  productCondition?: number | null;
  ship?: string | null;
  isMeta?: boolean | null;
  metaTag?: string | null;
  metaDescription?: string | null;
  youtube?: string | null;
  type?: string | null;
  license?: string | null;
  licenseQty?: string | null;
  link?: string | null;
  platform?: string | null;
  region?: string | null;
  licenceType?: string | null;
  measure?: string | null;
  featured?: boolean | null;
  best?: boolean | null;
  top?: boolean | null;
  hot?: boolean | null;
  latest?: boolean | null;
  big?: boolean | null;
  trending?: boolean | null;
  sale?: boolean | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  isDiscount?: boolean | null;
  discountDate?: string | null;
  wholeSellQty?: string | null;
  wholeSellDiscount?: string | null;
  isCatalog?: boolean | null;
  catalogId?: number | null;
}

export type NewProducts = Omit<IProducts, 'id'> & { id: null };

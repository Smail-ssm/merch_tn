import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IProducts, NewProducts } from '../products.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProducts for edit and NewProductsFormGroupInput for create.
 */
type ProductsFormGroupInput = IProducts | PartialWithRequiredKeyOf<NewProducts>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IProducts | NewProducts> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type ProductsFormRawValue = FormValueOf<IProducts>;

type NewProductsFormRawValue = FormValueOf<NewProducts>;

type ProductsFormDefaults = Pick<
  NewProducts,
  | 'id'
  | 'isMeta'
  | 'featured'
  | 'best'
  | 'top'
  | 'hot'
  | 'latest'
  | 'big'
  | 'trending'
  | 'sale'
  | 'createdAt'
  | 'updatedAt'
  | 'isDiscount'
  | 'isCatalog'
>;

type ProductsFormGroupContent = {
  id: FormControl<ProductsFormRawValue['id'] | NewProducts['id']>;
  sku: FormControl<ProductsFormRawValue['sku']>;
  productType: FormControl<ProductsFormRawValue['productType']>;
  affiliateLink: FormControl<ProductsFormRawValue['affiliateLink']>;
  userId: FormControl<ProductsFormRawValue['userId']>;
  categoryId: FormControl<ProductsFormRawValue['categoryId']>;
  subcategoryId: FormControl<ProductsFormRawValue['subcategoryId']>;
  childcategoryId: FormControl<ProductsFormRawValue['childcategoryId']>;
  attributes: FormControl<ProductsFormRawValue['attributes']>;
  name: FormControl<ProductsFormRawValue['name']>;
  slug: FormControl<ProductsFormRawValue['slug']>;
  photo: FormControl<ProductsFormRawValue['photo']>;
  thumbnail: FormControl<ProductsFormRawValue['thumbnail']>;
  file: FormControl<ProductsFormRawValue['file']>;
  size: FormControl<ProductsFormRawValue['size']>;
  sizeQty: FormControl<ProductsFormRawValue['sizeQty']>;
  sizePrice: FormControl<ProductsFormRawValue['sizePrice']>;
  color: FormControl<ProductsFormRawValue['color']>;
  price: FormControl<ProductsFormRawValue['price']>;
  previousPrice: FormControl<ProductsFormRawValue['previousPrice']>;
  details: FormControl<ProductsFormRawValue['details']>;
  stock: FormControl<ProductsFormRawValue['stock']>;
  policy: FormControl<ProductsFormRawValue['policy']>;
  status: FormControl<ProductsFormRawValue['status']>;
  views: FormControl<ProductsFormRawValue['views']>;
  tags: FormControl<ProductsFormRawValue['tags']>;
  features: FormControl<ProductsFormRawValue['features']>;
  colors: FormControl<ProductsFormRawValue['colors']>;
  productCondition: FormControl<ProductsFormRawValue['productCondition']>;
  ship: FormControl<ProductsFormRawValue['ship']>;
  isMeta: FormControl<ProductsFormRawValue['isMeta']>;
  metaTag: FormControl<ProductsFormRawValue['metaTag']>;
  metaDescription: FormControl<ProductsFormRawValue['metaDescription']>;
  youtube: FormControl<ProductsFormRawValue['youtube']>;
  type: FormControl<ProductsFormRawValue['type']>;
  license: FormControl<ProductsFormRawValue['license']>;
  licenseQty: FormControl<ProductsFormRawValue['licenseQty']>;
  link: FormControl<ProductsFormRawValue['link']>;
  platform: FormControl<ProductsFormRawValue['platform']>;
  region: FormControl<ProductsFormRawValue['region']>;
  licenceType: FormControl<ProductsFormRawValue['licenceType']>;
  measure: FormControl<ProductsFormRawValue['measure']>;
  featured: FormControl<ProductsFormRawValue['featured']>;
  best: FormControl<ProductsFormRawValue['best']>;
  top: FormControl<ProductsFormRawValue['top']>;
  hot: FormControl<ProductsFormRawValue['hot']>;
  latest: FormControl<ProductsFormRawValue['latest']>;
  big: FormControl<ProductsFormRawValue['big']>;
  trending: FormControl<ProductsFormRawValue['trending']>;
  sale: FormControl<ProductsFormRawValue['sale']>;
  createdAt: FormControl<ProductsFormRawValue['createdAt']>;
  updatedAt: FormControl<ProductsFormRawValue['updatedAt']>;
  isDiscount: FormControl<ProductsFormRawValue['isDiscount']>;
  discountDate: FormControl<ProductsFormRawValue['discountDate']>;
  wholeSellQty: FormControl<ProductsFormRawValue['wholeSellQty']>;
  wholeSellDiscount: FormControl<ProductsFormRawValue['wholeSellDiscount']>;
  isCatalog: FormControl<ProductsFormRawValue['isCatalog']>;
  catalogId: FormControl<ProductsFormRawValue['catalogId']>;
};

export type ProductsFormGroup = FormGroup<ProductsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductsFormService {
  createProductsFormGroup(products: ProductsFormGroupInput = { id: null }): ProductsFormGroup {
    const productsRawValue = this.convertProductsToProductsRawValue({
      ...this.getFormDefaults(),
      ...products,
    });
    return new FormGroup<ProductsFormGroupContent>({
      id: new FormControl(
        { value: productsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      sku: new FormControl(productsRawValue.sku),
      productType: new FormControl(productsRawValue.productType),
      affiliateLink: new FormControl(productsRawValue.affiliateLink),
      userId: new FormControl(productsRawValue.userId),
      categoryId: new FormControl(productsRawValue.categoryId),
      subcategoryId: new FormControl(productsRawValue.subcategoryId),
      childcategoryId: new FormControl(productsRawValue.childcategoryId),
      attributes: new FormControl(productsRawValue.attributes),
      name: new FormControl(productsRawValue.name, {
        validators: [Validators.required],
      }),
      slug: new FormControl(productsRawValue.slug),
      photo: new FormControl(productsRawValue.photo, {
        validators: [Validators.required],
      }),
      thumbnail: new FormControl(productsRawValue.thumbnail),
      file: new FormControl(productsRawValue.file),
      size: new FormControl(productsRawValue.size),
      sizeQty: new FormControl(productsRawValue.sizeQty),
      sizePrice: new FormControl(productsRawValue.sizePrice),
      color: new FormControl(productsRawValue.color),
      price: new FormControl(productsRawValue.price, {
        validators: [Validators.required],
      }),
      previousPrice: new FormControl(productsRawValue.previousPrice),
      details: new FormControl(productsRawValue.details),
      stock: new FormControl(productsRawValue.stock),
      policy: new FormControl(productsRawValue.policy),
      status: new FormControl(productsRawValue.status, {
        validators: [Validators.required],
      }),
      views: new FormControl(productsRawValue.views, {
        validators: [Validators.required],
      }),
      tags: new FormControl(productsRawValue.tags),
      features: new FormControl(productsRawValue.features),
      colors: new FormControl(productsRawValue.colors),
      productCondition: new FormControl(productsRawValue.productCondition, {
        validators: [Validators.required],
      }),
      ship: new FormControl(productsRawValue.ship),
      isMeta: new FormControl(productsRawValue.isMeta, {
        validators: [Validators.required],
      }),
      metaTag: new FormControl(productsRawValue.metaTag),
      metaDescription: new FormControl(productsRawValue.metaDescription),
      youtube: new FormControl(productsRawValue.youtube),
      type: new FormControl(productsRawValue.type, {
        validators: [Validators.required],
      }),
      license: new FormControl(productsRawValue.license),
      licenseQty: new FormControl(productsRawValue.licenseQty),
      link: new FormControl(productsRawValue.link),
      platform: new FormControl(productsRawValue.platform),
      region: new FormControl(productsRawValue.region),
      licenceType: new FormControl(productsRawValue.licenceType),
      measure: new FormControl(productsRawValue.measure),
      featured: new FormControl(productsRawValue.featured, {
        validators: [Validators.required],
      }),
      best: new FormControl(productsRawValue.best, {
        validators: [Validators.required],
      }),
      top: new FormControl(productsRawValue.top, {
        validators: [Validators.required],
      }),
      hot: new FormControl(productsRawValue.hot, {
        validators: [Validators.required],
      }),
      latest: new FormControl(productsRawValue.latest, {
        validators: [Validators.required],
      }),
      big: new FormControl(productsRawValue.big, {
        validators: [Validators.required],
      }),
      trending: new FormControl(productsRawValue.trending, {
        validators: [Validators.required],
      }),
      sale: new FormControl(productsRawValue.sale, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(productsRawValue.createdAt),
      updatedAt: new FormControl(productsRawValue.updatedAt),
      isDiscount: new FormControl(productsRawValue.isDiscount, {
        validators: [Validators.required],
      }),
      discountDate: new FormControl(productsRawValue.discountDate),
      wholeSellQty: new FormControl(productsRawValue.wholeSellQty),
      wholeSellDiscount: new FormControl(productsRawValue.wholeSellDiscount),
      isCatalog: new FormControl(productsRawValue.isCatalog, {
        validators: [Validators.required],
      }),
      catalogId: new FormControl(productsRawValue.catalogId),
    });
  }

  getProducts(form: ProductsFormGroup): IProducts | NewProducts {
    return this.convertProductsRawValueToProducts(form.getRawValue() as ProductsFormRawValue | NewProductsFormRawValue);
  }

  resetForm(form: ProductsFormGroup, products: ProductsFormGroupInput): void {
    const productsRawValue = this.convertProductsToProductsRawValue({ ...this.getFormDefaults(), ...products });
    form.reset(
      {
        ...productsRawValue,
        id: { value: productsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProductsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      isMeta: false,
      featured: false,
      best: false,
      top: false,
      hot: false,
      latest: false,
      big: false,
      trending: false,
      sale: false,
      createdAt: currentTime,
      updatedAt: currentTime,
      isDiscount: false,
      isCatalog: false,
    };
  }

  private convertProductsRawValueToProducts(rawProducts: ProductsFormRawValue | NewProductsFormRawValue): IProducts | NewProducts {
    return {
      ...rawProducts,
      createdAt: dayjs(rawProducts.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawProducts.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertProductsToProductsRawValue(
    products: IProducts | (Partial<NewProducts> & ProductsFormDefaults),
  ): ProductsFormRawValue | PartialWithRequiredKeyOf<NewProductsFormRawValue> {
    return {
      ...products,
      createdAt: products.createdAt ? products.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: products.updatedAt ? products.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}

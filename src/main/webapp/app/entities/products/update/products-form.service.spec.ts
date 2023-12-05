import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../products.test-samples';

import { ProductsFormService } from './products-form.service';

describe('Products Form Service', () => {
  let service: ProductsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsFormService);
  });

  describe('Service methods', () => {
    describe('createProductsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProductsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sku: expect.any(Object),
            productType: expect.any(Object),
            affiliateLink: expect.any(Object),
            userId: expect.any(Object),
            categoryId: expect.any(Object),
            subcategoryId: expect.any(Object),
            childcategoryId: expect.any(Object),
            attributes: expect.any(Object),
            name: expect.any(Object),
            slug: expect.any(Object),
            photo: expect.any(Object),
            thumbnail: expect.any(Object),
            file: expect.any(Object),
            size: expect.any(Object),
            sizeQty: expect.any(Object),
            sizePrice: expect.any(Object),
            color: expect.any(Object),
            price: expect.any(Object),
            previousPrice: expect.any(Object),
            details: expect.any(Object),
            stock: expect.any(Object),
            policy: expect.any(Object),
            status: expect.any(Object),
            views: expect.any(Object),
            tags: expect.any(Object),
            features: expect.any(Object),
            colors: expect.any(Object),
            productCondition: expect.any(Object),
            ship: expect.any(Object),
            isMeta: expect.any(Object),
            metaTag: expect.any(Object),
            metaDescription: expect.any(Object),
            youtube: expect.any(Object),
            type: expect.any(Object),
            license: expect.any(Object),
            licenseQty: expect.any(Object),
            link: expect.any(Object),
            platform: expect.any(Object),
            region: expect.any(Object),
            licenceType: expect.any(Object),
            measure: expect.any(Object),
            featured: expect.any(Object),
            best: expect.any(Object),
            top: expect.any(Object),
            hot: expect.any(Object),
            latest: expect.any(Object),
            big: expect.any(Object),
            trending: expect.any(Object),
            sale: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
            isDiscount: expect.any(Object),
            discountDate: expect.any(Object),
            wholeSellQty: expect.any(Object),
            wholeSellDiscount: expect.any(Object),
            isCatalog: expect.any(Object),
            catalogId: expect.any(Object),
          }),
        );
      });

      it('passing IProducts should create a new form with FormGroup', () => {
        const formGroup = service.createProductsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sku: expect.any(Object),
            productType: expect.any(Object),
            affiliateLink: expect.any(Object),
            userId: expect.any(Object),
            categoryId: expect.any(Object),
            subcategoryId: expect.any(Object),
            childcategoryId: expect.any(Object),
            attributes: expect.any(Object),
            name: expect.any(Object),
            slug: expect.any(Object),
            photo: expect.any(Object),
            thumbnail: expect.any(Object),
            file: expect.any(Object),
            size: expect.any(Object),
            sizeQty: expect.any(Object),
            sizePrice: expect.any(Object),
            color: expect.any(Object),
            price: expect.any(Object),
            previousPrice: expect.any(Object),
            details: expect.any(Object),
            stock: expect.any(Object),
            policy: expect.any(Object),
            status: expect.any(Object),
            views: expect.any(Object),
            tags: expect.any(Object),
            features: expect.any(Object),
            colors: expect.any(Object),
            productCondition: expect.any(Object),
            ship: expect.any(Object),
            isMeta: expect.any(Object),
            metaTag: expect.any(Object),
            metaDescription: expect.any(Object),
            youtube: expect.any(Object),
            type: expect.any(Object),
            license: expect.any(Object),
            licenseQty: expect.any(Object),
            link: expect.any(Object),
            platform: expect.any(Object),
            region: expect.any(Object),
            licenceType: expect.any(Object),
            measure: expect.any(Object),
            featured: expect.any(Object),
            best: expect.any(Object),
            top: expect.any(Object),
            hot: expect.any(Object),
            latest: expect.any(Object),
            big: expect.any(Object),
            trending: expect.any(Object),
            sale: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
            isDiscount: expect.any(Object),
            discountDate: expect.any(Object),
            wholeSellQty: expect.any(Object),
            wholeSellDiscount: expect.any(Object),
            isCatalog: expect.any(Object),
            catalogId: expect.any(Object),
          }),
        );
      });
    });

    describe('getProducts', () => {
      it('should return NewProducts for default Products initial value', () => {
        const formGroup = service.createProductsFormGroup(sampleWithNewData);

        const products = service.getProducts(formGroup) as any;

        expect(products).toMatchObject(sampleWithNewData);
      });

      it('should return NewProducts for empty Products initial value', () => {
        const formGroup = service.createProductsFormGroup();

        const products = service.getProducts(formGroup) as any;

        expect(products).toMatchObject({});
      });

      it('should return IProducts', () => {
        const formGroup = service.createProductsFormGroup(sampleWithRequiredData);

        const products = service.getProducts(formGroup) as any;

        expect(products).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProducts should not enable id FormControl', () => {
        const formGroup = service.createProductsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProducts should disable id FormControl', () => {
        const formGroup = service.createProductsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

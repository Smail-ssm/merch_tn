import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../vendor-orders.test-samples';

import { VendorOrdersFormService } from './vendor-orders-form.service';

describe('VendorOrders Form Service', () => {
  let service: VendorOrdersFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorOrdersFormService);
  });

  describe('Service methods', () => {
    describe('createVendorOrdersFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createVendorOrdersFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            userId: expect.any(Object),
            orderId: expect.any(Object),
            qty: expect.any(Object),
            price: expect.any(Object),
            orderNumber: expect.any(Object),
            status: expect.any(Object),
          }),
        );
      });

      it('passing IVendorOrders should create a new form with FormGroup', () => {
        const formGroup = service.createVendorOrdersFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            userId: expect.any(Object),
            orderId: expect.any(Object),
            qty: expect.any(Object),
            price: expect.any(Object),
            orderNumber: expect.any(Object),
            status: expect.any(Object),
          }),
        );
      });
    });

    describe('getVendorOrders', () => {
      it('should return NewVendorOrders for default VendorOrders initial value', () => {
        const formGroup = service.createVendorOrdersFormGroup(sampleWithNewData);

        const vendorOrders = service.getVendorOrders(formGroup) as any;

        expect(vendorOrders).toMatchObject(sampleWithNewData);
      });

      it('should return NewVendorOrders for empty VendorOrders initial value', () => {
        const formGroup = service.createVendorOrdersFormGroup();

        const vendorOrders = service.getVendorOrders(formGroup) as any;

        expect(vendorOrders).toMatchObject({});
      });

      it('should return IVendorOrders', () => {
        const formGroup = service.createVendorOrdersFormGroup(sampleWithRequiredData);

        const vendorOrders = service.getVendorOrders(formGroup) as any;

        expect(vendorOrders).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IVendorOrders should not enable id FormControl', () => {
        const formGroup = service.createVendorOrdersFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewVendorOrders should disable id FormControl', () => {
        const formGroup = service.createVendorOrdersFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

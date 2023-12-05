import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../orders.test-samples';

import { OrdersFormService } from './orders-form.service';

describe('Orders Form Service', () => {
  let service: OrdersFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersFormService);
  });

  describe('Service methods', () => {
    describe('createOrdersFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createOrdersFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            userId: expect.any(Object),
            cart: expect.any(Object),
            method: expect.any(Object),
            shipping: expect.any(Object),
            pickupLocation: expect.any(Object),
            totalQty: expect.any(Object),
            payAmount: expect.any(Object),
            txnid: expect.any(Object),
            chargeId: expect.any(Object),
            orderNumber: expect.any(Object),
            paymentStatus: expect.any(Object),
            customerEmail: expect.any(Object),
            customerName: expect.any(Object),
            customerCountry: expect.any(Object),
            customerPhone: expect.any(Object),
            customerAddress: expect.any(Object),
            customerCity: expect.any(Object),
            customerZip: expect.any(Object),
            shippingName: expect.any(Object),
            shippingCountry: expect.any(Object),
            shippingEmail: expect.any(Object),
            shippingPhone: expect.any(Object),
            shippingAddress: expect.any(Object),
            shippingCity: expect.any(Object),
            shippingZip: expect.any(Object),
            orderNote: expect.any(Object),
            couponCode: expect.any(Object),
            couponDiscount: expect.any(Object),
            status: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
            affilateUser: expect.any(Object),
            affilateCharge: expect.any(Object),
            currencySign: expect.any(Object),
            currencyValue: expect.any(Object),
            shippingCost: expect.any(Object),
            packingCost: expect.any(Object),
            tax: expect.any(Object),
            dp: expect.any(Object),
            payId: expect.any(Object),
            vendorShippingId: expect.any(Object),
            vendorPackingId: expect.any(Object),
            wholeDiscount: expect.any(Object),
          }),
        );
      });

      it('passing IOrders should create a new form with FormGroup', () => {
        const formGroup = service.createOrdersFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            userId: expect.any(Object),
            cart: expect.any(Object),
            method: expect.any(Object),
            shipping: expect.any(Object),
            pickupLocation: expect.any(Object),
            totalQty: expect.any(Object),
            payAmount: expect.any(Object),
            txnid: expect.any(Object),
            chargeId: expect.any(Object),
            orderNumber: expect.any(Object),
            paymentStatus: expect.any(Object),
            customerEmail: expect.any(Object),
            customerName: expect.any(Object),
            customerCountry: expect.any(Object),
            customerPhone: expect.any(Object),
            customerAddress: expect.any(Object),
            customerCity: expect.any(Object),
            customerZip: expect.any(Object),
            shippingName: expect.any(Object),
            shippingCountry: expect.any(Object),
            shippingEmail: expect.any(Object),
            shippingPhone: expect.any(Object),
            shippingAddress: expect.any(Object),
            shippingCity: expect.any(Object),
            shippingZip: expect.any(Object),
            orderNote: expect.any(Object),
            couponCode: expect.any(Object),
            couponDiscount: expect.any(Object),
            status: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
            affilateUser: expect.any(Object),
            affilateCharge: expect.any(Object),
            currencySign: expect.any(Object),
            currencyValue: expect.any(Object),
            shippingCost: expect.any(Object),
            packingCost: expect.any(Object),
            tax: expect.any(Object),
            dp: expect.any(Object),
            payId: expect.any(Object),
            vendorShippingId: expect.any(Object),
            vendorPackingId: expect.any(Object),
            wholeDiscount: expect.any(Object),
          }),
        );
      });
    });

    describe('getOrders', () => {
      it('should return NewOrders for default Orders initial value', () => {
        const formGroup = service.createOrdersFormGroup(sampleWithNewData);

        const orders = service.getOrders(formGroup) as any;

        expect(orders).toMatchObject(sampleWithNewData);
      });

      it('should return NewOrders for empty Orders initial value', () => {
        const formGroup = service.createOrdersFormGroup();

        const orders = service.getOrders(formGroup) as any;

        expect(orders).toMatchObject({});
      });

      it('should return IOrders', () => {
        const formGroup = service.createOrdersFormGroup(sampleWithRequiredData);

        const orders = service.getOrders(formGroup) as any;

        expect(orders).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IOrders should not enable id FormControl', () => {
        const formGroup = service.createOrdersFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewOrders should disable id FormControl', () => {
        const formGroup = service.createOrdersFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

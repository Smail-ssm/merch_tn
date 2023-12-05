import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOrders, NewOrders } from '../orders.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOrders for edit and NewOrdersFormGroupInput for create.
 */
type OrdersFormGroupInput = IOrders | PartialWithRequiredKeyOf<NewOrders>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOrders | NewOrders> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type OrdersFormRawValue = FormValueOf<IOrders>;

type NewOrdersFormRawValue = FormValueOf<NewOrders>;

type OrdersFormDefaults = Pick<NewOrders, 'id' | 'createdAt' | 'updatedAt' | 'dp'>;

type OrdersFormGroupContent = {
  id: FormControl<OrdersFormRawValue['id'] | NewOrders['id']>;
  userId: FormControl<OrdersFormRawValue['userId']>;
  cart: FormControl<OrdersFormRawValue['cart']>;
  method: FormControl<OrdersFormRawValue['method']>;
  shipping: FormControl<OrdersFormRawValue['shipping']>;
  pickupLocation: FormControl<OrdersFormRawValue['pickupLocation']>;
  totalQty: FormControl<OrdersFormRawValue['totalQty']>;
  payAmount: FormControl<OrdersFormRawValue['payAmount']>;
  txnid: FormControl<OrdersFormRawValue['txnid']>;
  chargeId: FormControl<OrdersFormRawValue['chargeId']>;
  orderNumber: FormControl<OrdersFormRawValue['orderNumber']>;
  paymentStatus: FormControl<OrdersFormRawValue['paymentStatus']>;
  customerEmail: FormControl<OrdersFormRawValue['customerEmail']>;
  customerName: FormControl<OrdersFormRawValue['customerName']>;
  customerCountry: FormControl<OrdersFormRawValue['customerCountry']>;
  customerPhone: FormControl<OrdersFormRawValue['customerPhone']>;
  customerAddress: FormControl<OrdersFormRawValue['customerAddress']>;
  customerCity: FormControl<OrdersFormRawValue['customerCity']>;
  customerZip: FormControl<OrdersFormRawValue['customerZip']>;
  shippingName: FormControl<OrdersFormRawValue['shippingName']>;
  shippingCountry: FormControl<OrdersFormRawValue['shippingCountry']>;
  shippingEmail: FormControl<OrdersFormRawValue['shippingEmail']>;
  shippingPhone: FormControl<OrdersFormRawValue['shippingPhone']>;
  shippingAddress: FormControl<OrdersFormRawValue['shippingAddress']>;
  shippingCity: FormControl<OrdersFormRawValue['shippingCity']>;
  shippingZip: FormControl<OrdersFormRawValue['shippingZip']>;
  orderNote: FormControl<OrdersFormRawValue['orderNote']>;
  couponCode: FormControl<OrdersFormRawValue['couponCode']>;
  couponDiscount: FormControl<OrdersFormRawValue['couponDiscount']>;
  status: FormControl<OrdersFormRawValue['status']>;
  createdAt: FormControl<OrdersFormRawValue['createdAt']>;
  updatedAt: FormControl<OrdersFormRawValue['updatedAt']>;
  affilateUser: FormControl<OrdersFormRawValue['affilateUser']>;
  affilateCharge: FormControl<OrdersFormRawValue['affilateCharge']>;
  currencySign: FormControl<OrdersFormRawValue['currencySign']>;
  currencyValue: FormControl<OrdersFormRawValue['currencyValue']>;
  shippingCost: FormControl<OrdersFormRawValue['shippingCost']>;
  packingCost: FormControl<OrdersFormRawValue['packingCost']>;
  tax: FormControl<OrdersFormRawValue['tax']>;
  dp: FormControl<OrdersFormRawValue['dp']>;
  payId: FormControl<OrdersFormRawValue['payId']>;
  vendorShippingId: FormControl<OrdersFormRawValue['vendorShippingId']>;
  vendorPackingId: FormControl<OrdersFormRawValue['vendorPackingId']>;
  wholeDiscount: FormControl<OrdersFormRawValue['wholeDiscount']>;
};

export type OrdersFormGroup = FormGroup<OrdersFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OrdersFormService {
  createOrdersFormGroup(orders: OrdersFormGroupInput = { id: null }): OrdersFormGroup {
    const ordersRawValue = this.convertOrdersToOrdersRawValue({
      ...this.getFormDefaults(),
      ...orders,
    });
    return new FormGroup<OrdersFormGroupContent>({
      id: new FormControl(
        { value: ordersRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      userId: new FormControl(ordersRawValue.userId),
      cart: new FormControl(ordersRawValue.cart, {
        validators: [Validators.required],
      }),
      method: new FormControl(ordersRawValue.method),
      shipping: new FormControl(ordersRawValue.shipping),
      pickupLocation: new FormControl(ordersRawValue.pickupLocation),
      totalQty: new FormControl(ordersRawValue.totalQty, {
        validators: [Validators.required],
      }),
      payAmount: new FormControl(ordersRawValue.payAmount, {
        validators: [Validators.required],
      }),
      txnid: new FormControl(ordersRawValue.txnid),
      chargeId: new FormControl(ordersRawValue.chargeId),
      orderNumber: new FormControl(ordersRawValue.orderNumber, {
        validators: [Validators.required],
      }),
      paymentStatus: new FormControl(ordersRawValue.paymentStatus, {
        validators: [Validators.required],
      }),
      customerEmail: new FormControl(ordersRawValue.customerEmail, {
        validators: [Validators.required],
      }),
      customerName: new FormControl(ordersRawValue.customerName, {
        validators: [Validators.required],
      }),
      customerCountry: new FormControl(ordersRawValue.customerCountry, {
        validators: [Validators.required],
      }),
      customerPhone: new FormControl(ordersRawValue.customerPhone, {
        validators: [Validators.required],
      }),
      customerAddress: new FormControl(ordersRawValue.customerAddress),
      customerCity: new FormControl(ordersRawValue.customerCity),
      customerZip: new FormControl(ordersRawValue.customerZip),
      shippingName: new FormControl(ordersRawValue.shippingName),
      shippingCountry: new FormControl(ordersRawValue.shippingCountry),
      shippingEmail: new FormControl(ordersRawValue.shippingEmail),
      shippingPhone: new FormControl(ordersRawValue.shippingPhone),
      shippingAddress: new FormControl(ordersRawValue.shippingAddress),
      shippingCity: new FormControl(ordersRawValue.shippingCity),
      shippingZip: new FormControl(ordersRawValue.shippingZip),
      orderNote: new FormControl(ordersRawValue.orderNote),
      couponCode: new FormControl(ordersRawValue.couponCode),
      couponDiscount: new FormControl(ordersRawValue.couponDiscount),
      status: new FormControl(ordersRawValue.status, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(ordersRawValue.createdAt),
      updatedAt: new FormControl(ordersRawValue.updatedAt),
      affilateUser: new FormControl(ordersRawValue.affilateUser),
      affilateCharge: new FormControl(ordersRawValue.affilateCharge),
      currencySign: new FormControl(ordersRawValue.currencySign, {
        validators: [Validators.required],
      }),
      currencyValue: new FormControl(ordersRawValue.currencyValue, {
        validators: [Validators.required],
      }),
      shippingCost: new FormControl(ordersRawValue.shippingCost, {
        validators: [Validators.required],
      }),
      packingCost: new FormControl(ordersRawValue.packingCost, {
        validators: [Validators.required],
      }),
      tax: new FormControl(ordersRawValue.tax, {
        validators: [Validators.required],
      }),
      dp: new FormControl(ordersRawValue.dp, {
        validators: [Validators.required],
      }),
      payId: new FormControl(ordersRawValue.payId),
      vendorShippingId: new FormControl(ordersRawValue.vendorShippingId, {
        validators: [Validators.required],
      }),
      vendorPackingId: new FormControl(ordersRawValue.vendorPackingId, {
        validators: [Validators.required],
      }),
      wholeDiscount: new FormControl(ordersRawValue.wholeDiscount, {
        validators: [Validators.required],
      }),
    });
  }

  getOrders(form: OrdersFormGroup): IOrders | NewOrders {
    return this.convertOrdersRawValueToOrders(form.getRawValue() as OrdersFormRawValue | NewOrdersFormRawValue);
  }

  resetForm(form: OrdersFormGroup, orders: OrdersFormGroupInput): void {
    const ordersRawValue = this.convertOrdersToOrdersRawValue({ ...this.getFormDefaults(), ...orders });
    form.reset(
      {
        ...ordersRawValue,
        id: { value: ordersRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): OrdersFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
      dp: false,
    };
  }

  private convertOrdersRawValueToOrders(rawOrders: OrdersFormRawValue | NewOrdersFormRawValue): IOrders | NewOrders {
    return {
      ...rawOrders,
      createdAt: dayjs(rawOrders.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawOrders.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertOrdersToOrdersRawValue(
    orders: IOrders | (Partial<NewOrders> & OrdersFormDefaults),
  ): OrdersFormRawValue | PartialWithRequiredKeyOf<NewOrdersFormRawValue> {
    return {
      ...orders,
      createdAt: orders.createdAt ? orders.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: orders.updatedAt ? orders.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}

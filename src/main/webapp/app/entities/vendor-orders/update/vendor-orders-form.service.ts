import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IVendorOrders, NewVendorOrders } from '../vendor-orders.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IVendorOrders for edit and NewVendorOrdersFormGroupInput for create.
 */
type VendorOrdersFormGroupInput = IVendorOrders | PartialWithRequiredKeyOf<NewVendorOrders>;

type VendorOrdersFormDefaults = Pick<NewVendorOrders, 'id'>;

type VendorOrdersFormGroupContent = {
  id: FormControl<IVendorOrders['id'] | NewVendorOrders['id']>;
  userId: FormControl<IVendorOrders['userId']>;
  orderId: FormControl<IVendorOrders['orderId']>;
  qty: FormControl<IVendorOrders['qty']>;
  price: FormControl<IVendorOrders['price']>;
  orderNumber: FormControl<IVendorOrders['orderNumber']>;
  status: FormControl<IVendorOrders['status']>;
};

export type VendorOrdersFormGroup = FormGroup<VendorOrdersFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class VendorOrdersFormService {
  createVendorOrdersFormGroup(vendorOrders: VendorOrdersFormGroupInput = { id: null }): VendorOrdersFormGroup {
    const vendorOrdersRawValue = {
      ...this.getFormDefaults(),
      ...vendorOrders,
    };
    return new FormGroup<VendorOrdersFormGroupContent>({
      id: new FormControl(
        { value: vendorOrdersRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      userId: new FormControl(vendorOrdersRawValue.userId, {
        validators: [Validators.required],
      }),
      orderId: new FormControl(vendorOrdersRawValue.orderId, {
        validators: [Validators.required],
      }),
      qty: new FormControl(vendorOrdersRawValue.qty, {
        validators: [Validators.required],
      }),
      price: new FormControl(vendorOrdersRawValue.price, {
        validators: [Validators.required],
      }),
      orderNumber: new FormControl(vendorOrdersRawValue.orderNumber, {
        validators: [Validators.required],
      }),
      status: new FormControl(vendorOrdersRawValue.status, {
        validators: [Validators.required],
      }),
    });
  }

  getVendorOrders(form: VendorOrdersFormGroup): IVendorOrders | NewVendorOrders {
    return form.getRawValue() as IVendorOrders | NewVendorOrders;
  }

  resetForm(form: VendorOrdersFormGroup, vendorOrders: VendorOrdersFormGroupInput): void {
    const vendorOrdersRawValue = { ...this.getFormDefaults(), ...vendorOrders };
    form.reset(
      {
        ...vendorOrdersRawValue,
        id: { value: vendorOrdersRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): VendorOrdersFormDefaults {
    return {
      id: null,
    };
  }
}

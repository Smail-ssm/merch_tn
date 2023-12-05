import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IAdmins, NewAdmins } from '../admins.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAdmins for edit and NewAdminsFormGroupInput for create.
 */
type AdminsFormGroupInput = IAdmins | PartialWithRequiredKeyOf<NewAdmins>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IAdmins | NewAdmins> = Omit<T, 'createdat' | 'updatedat'> & {
  createdat?: string | null;
  updatedat?: string | null;
};

type AdminsFormRawValue = FormValueOf<IAdmins>;

type NewAdminsFormRawValue = FormValueOf<NewAdmins>;

type AdminsFormDefaults = Pick<NewAdmins, 'id' | 'status' | 'createdat' | 'updatedat'>;

type AdminsFormGroupContent = {
  id: FormControl<AdminsFormRawValue['id'] | NewAdmins['id']>;
  name: FormControl<AdminsFormRawValue['name']>;
  email: FormControl<AdminsFormRawValue['email']>;
  phone: FormControl<AdminsFormRawValue['phone']>;
  role: FormControl<AdminsFormRawValue['role']>;
  photo: FormControl<AdminsFormRawValue['photo']>;
  password: FormControl<AdminsFormRawValue['password']>;
  status: FormControl<AdminsFormRawValue['status']>;
  rememberToken: FormControl<AdminsFormRawValue['rememberToken']>;
  createdat: FormControl<AdminsFormRawValue['createdat']>;
  updatedat: FormControl<AdminsFormRawValue['updatedat']>;
  shopName: FormControl<AdminsFormRawValue['shopName']>;
};

export type AdminsFormGroup = FormGroup<AdminsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AdminsFormService {
  createAdminsFormGroup(admins: AdminsFormGroupInput = { id: null }): AdminsFormGroup {
    const adminsRawValue = this.convertAdminsToAdminsRawValue({
      ...this.getFormDefaults(),
      ...admins,
    });
    return new FormGroup<AdminsFormGroupContent>({
      id: new FormControl(
        { value: adminsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(adminsRawValue.name, {
        validators: [Validators.required],
      }),
      email: new FormControl(adminsRawValue.email, {
        validators: [Validators.required],
      }),
      phone: new FormControl(adminsRawValue.phone, {
        validators: [Validators.required],
      }),
      role: new FormControl(adminsRawValue.role),
      photo: new FormControl(adminsRawValue.photo),
      password: new FormControl(adminsRawValue.password, {
        validators: [Validators.required],
      }),
      status: new FormControl(adminsRawValue.status, {
        validators: [Validators.required],
      }),
      rememberToken: new FormControl(adminsRawValue.rememberToken),
      createdat: new FormControl(adminsRawValue.createdat),
      updatedat: new FormControl(adminsRawValue.updatedat),
      shopName: new FormControl(adminsRawValue.shopName),
    });
  }

  getAdmins(form: AdminsFormGroup): IAdmins | NewAdmins {
    return this.convertAdminsRawValueToAdmins(form.getRawValue() as AdminsFormRawValue | NewAdminsFormRawValue);
  }

  resetForm(form: AdminsFormGroup, admins: AdminsFormGroupInput): void {
    const adminsRawValue = this.convertAdminsToAdminsRawValue({ ...this.getFormDefaults(), ...admins });
    form.reset(
      {
        ...adminsRawValue,
        id: { value: adminsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AdminsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      status: false,
      createdat: currentTime,
      updatedat: currentTime,
    };
  }

  private convertAdminsRawValueToAdmins(rawAdmins: AdminsFormRawValue | NewAdminsFormRawValue): IAdmins | NewAdmins {
    return {
      ...rawAdmins,
      createdat: dayjs(rawAdmins.createdat, DATE_TIME_FORMAT),
      updatedat: dayjs(rawAdmins.updatedat, DATE_TIME_FORMAT),
    };
  }

  private convertAdminsToAdminsRawValue(
    admins: IAdmins | (Partial<NewAdmins> & AdminsFormDefaults),
  ): AdminsFormRawValue | PartialWithRequiredKeyOf<NewAdminsFormRawValue> {
    return {
      ...admins,
      createdat: admins.createdat ? admins.createdat.format(DATE_TIME_FORMAT) : undefined,
      updatedat: admins.updatedat ? admins.updatedat.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUsers, NewUsers } from '../users.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUsers for edit and NewUsersFormGroupInput for create.
 */
type UsersFormGroupInput = IUsers | PartialWithRequiredKeyOf<NewUsers>;

type UsersFormDefaults = Pick<
  NewUsers,
  'id' | 'isProvider' | 'status' | 'isVendor' | 'fCheck' | 'gCheck' | 'tCheck' | 'lCheck' | 'mailSent' | 'ban' | 'isPrinter'
>;

type UsersFormGroupContent = {
  id: FormControl<IUsers['id'] | NewUsers['id']>;
  name: FormControl<IUsers['name']>;
  photo: FormControl<IUsers['photo']>;
  zip: FormControl<IUsers['zip']>;
  city: FormControl<IUsers['city']>;
  country: FormControl<IUsers['country']>;
  address: FormControl<IUsers['address']>;
  phone: FormControl<IUsers['phone']>;
  fax: FormControl<IUsers['fax']>;
  email: FormControl<IUsers['email']>;
  password: FormControl<IUsers['password']>;
  rememberToken: FormControl<IUsers['rememberToken']>;
  createdAt: FormControl<IUsers['createdAt']>;
  updatedAt: FormControl<IUsers['updatedAt']>;
  isProvider: FormControl<IUsers['isProvider']>;
  status: FormControl<IUsers['status']>;
  verificationLink: FormControl<IUsers['verificationLink']>;
  emailVerified: FormControl<IUsers['emailVerified']>;
  affilateCode: FormControl<IUsers['affilateCode']>;
  affilateIncome: FormControl<IUsers['affilateIncome']>;
  shopName: FormControl<IUsers['shopName']>;
  ownerName: FormControl<IUsers['ownerName']>;
  shopNumber: FormControl<IUsers['shopNumber']>;
  shopAddress: FormControl<IUsers['shopAddress']>;
  regNumber: FormControl<IUsers['regNumber']>;
  shopMessage: FormControl<IUsers['shopMessage']>;
  shopDetails: FormControl<IUsers['shopDetails']>;
  shopImage: FormControl<IUsers['shopImage']>;
  fUrl: FormControl<IUsers['fUrl']>;
  gUrl: FormControl<IUsers['gUrl']>;
  tUrl: FormControl<IUsers['tUrl']>;
  lUrl: FormControl<IUsers['lUrl']>;
  isVendor: FormControl<IUsers['isVendor']>;
  fCheck: FormControl<IUsers['fCheck']>;
  gCheck: FormControl<IUsers['gCheck']>;
  tCheck: FormControl<IUsers['tCheck']>;
  lCheck: FormControl<IUsers['lCheck']>;
  mailSent: FormControl<IUsers['mailSent']>;
  shippingCost: FormControl<IUsers['shippingCost']>;
  currentBalance: FormControl<IUsers['currentBalance']>;
  date: FormControl<IUsers['date']>;
  ban: FormControl<IUsers['ban']>;
  isPrinter: FormControl<IUsers['isPrinter']>;
};

export type UsersFormGroup = FormGroup<UsersFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UsersFormService {
  createUsersFormGroup(users: UsersFormGroupInput = { id: null }): UsersFormGroup {
    const usersRawValue = {
      ...this.getFormDefaults(),
      ...users,
    };
    return new FormGroup<UsersFormGroupContent>({
      id: new FormControl(
        { value: usersRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(usersRawValue.name, {
        validators: [Validators.required],
      }),
      photo: new FormControl(usersRawValue.photo),
      zip: new FormControl(usersRawValue.zip),
      city: new FormControl(usersRawValue.city),
      country: new FormControl(usersRawValue.country),
      address: new FormControl(usersRawValue.address),
      phone: new FormControl(usersRawValue.phone),
      fax: new FormControl(usersRawValue.fax),
      email: new FormControl(usersRawValue.email, {
        validators: [Validators.required],
      }),
      password: new FormControl(usersRawValue.password),
      rememberToken: new FormControl(usersRawValue.rememberToken),
      createdAt: new FormControl(usersRawValue.createdAt),
      updatedAt: new FormControl(usersRawValue.updatedAt),
      isProvider: new FormControl(usersRawValue.isProvider),
      status: new FormControl(usersRawValue.status, {
        validators: [Validators.required],
      }),
      verificationLink: new FormControl(usersRawValue.verificationLink),
      emailVerified: new FormControl(usersRawValue.emailVerified),
      affilateCode: new FormControl(usersRawValue.affilateCode),
      affilateIncome: new FormControl(usersRawValue.affilateIncome, {
        validators: [Validators.required],
      }),
      shopName: new FormControl(usersRawValue.shopName),
      ownerName: new FormControl(usersRawValue.ownerName),
      shopNumber: new FormControl(usersRawValue.shopNumber),
      shopAddress: new FormControl(usersRawValue.shopAddress),
      regNumber: new FormControl(usersRawValue.regNumber),
      shopMessage: new FormControl(usersRawValue.shopMessage),
      shopDetails: new FormControl(usersRawValue.shopDetails),
      shopImage: new FormControl(usersRawValue.shopImage),
      fUrl: new FormControl(usersRawValue.fUrl),
      gUrl: new FormControl(usersRawValue.gUrl),
      tUrl: new FormControl(usersRawValue.tUrl),
      lUrl: new FormControl(usersRawValue.lUrl),
      isVendor: new FormControl(usersRawValue.isVendor, {
        validators: [Validators.required],
      }),
      fCheck: new FormControl(usersRawValue.fCheck, {
        validators: [Validators.required],
      }),
      gCheck: new FormControl(usersRawValue.gCheck, {
        validators: [Validators.required],
      }),
      tCheck: new FormControl(usersRawValue.tCheck, {
        validators: [Validators.required],
      }),
      lCheck: new FormControl(usersRawValue.lCheck, {
        validators: [Validators.required],
      }),
      mailSent: new FormControl(usersRawValue.mailSent, {
        validators: [Validators.required],
      }),
      shippingCost: new FormControl(usersRawValue.shippingCost, {
        validators: [Validators.required],
      }),
      currentBalance: new FormControl(usersRawValue.currentBalance, {
        validators: [Validators.required],
      }),
      date: new FormControl(usersRawValue.date),
      ban: new FormControl(usersRawValue.ban, {
        validators: [Validators.required],
      }),
      isPrinter: new FormControl(usersRawValue.isPrinter),
    });
  }

  getUsers(form: UsersFormGroup): IUsers | NewUsers {
    return form.getRawValue() as IUsers | NewUsers;
  }

  resetForm(form: UsersFormGroup, users: UsersFormGroupInput): void {
    const usersRawValue = { ...this.getFormDefaults(), ...users };
    form.reset(
      {
        ...usersRawValue,
        id: { value: usersRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): UsersFormDefaults {
    return {
      id: null,
      isProvider: false,
      status: false,
      isVendor: false,
      fCheck: false,
      gCheck: false,
      tCheck: false,
      lCheck: false,
      mailSent: false,
      ban: false,
      isPrinter: false,
    };
  }
}

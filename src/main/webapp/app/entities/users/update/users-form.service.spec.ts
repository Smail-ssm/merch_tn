import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../users.test-samples';

import { UsersFormService } from './users-form.service';

describe('Users Form Service', () => {
  let service: UsersFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersFormService);
  });

  describe('Service methods', () => {
    describe('createUsersFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUsersFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            photo: expect.any(Object),
            zip: expect.any(Object),
            city: expect.any(Object),
            country: expect.any(Object),
            address: expect.any(Object),
            phone: expect.any(Object),
            fax: expect.any(Object),
            email: expect.any(Object),
            password: expect.any(Object),
            rememberToken: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
            isProvider: expect.any(Object),
            status: expect.any(Object),
            verificationLink: expect.any(Object),
            emailVerified: expect.any(Object),
            affilateCode: expect.any(Object),
            affilateIncome: expect.any(Object),
            shopName: expect.any(Object),
            ownerName: expect.any(Object),
            shopNumber: expect.any(Object),
            shopAddress: expect.any(Object),
            regNumber: expect.any(Object),
            shopMessage: expect.any(Object),
            shopDetails: expect.any(Object),
            shopImage: expect.any(Object),
            fUrl: expect.any(Object),
            gUrl: expect.any(Object),
            tUrl: expect.any(Object),
            lUrl: expect.any(Object),
            isVendor: expect.any(Object),
            fCheck: expect.any(Object),
            gCheck: expect.any(Object),
            tCheck: expect.any(Object),
            lCheck: expect.any(Object),
            mailSent: expect.any(Object),
            shippingCost: expect.any(Object),
            currentBalance: expect.any(Object),
            date: expect.any(Object),
            ban: expect.any(Object),
            isPrinter: expect.any(Object),
          }),
        );
      });

      it('passing IUsers should create a new form with FormGroup', () => {
        const formGroup = service.createUsersFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            photo: expect.any(Object),
            zip: expect.any(Object),
            city: expect.any(Object),
            country: expect.any(Object),
            address: expect.any(Object),
            phone: expect.any(Object),
            fax: expect.any(Object),
            email: expect.any(Object),
            password: expect.any(Object),
            rememberToken: expect.any(Object),
            createdAt: expect.any(Object),
            updatedAt: expect.any(Object),
            isProvider: expect.any(Object),
            status: expect.any(Object),
            verificationLink: expect.any(Object),
            emailVerified: expect.any(Object),
            affilateCode: expect.any(Object),
            affilateIncome: expect.any(Object),
            shopName: expect.any(Object),
            ownerName: expect.any(Object),
            shopNumber: expect.any(Object),
            shopAddress: expect.any(Object),
            regNumber: expect.any(Object),
            shopMessage: expect.any(Object),
            shopDetails: expect.any(Object),
            shopImage: expect.any(Object),
            fUrl: expect.any(Object),
            gUrl: expect.any(Object),
            tUrl: expect.any(Object),
            lUrl: expect.any(Object),
            isVendor: expect.any(Object),
            fCheck: expect.any(Object),
            gCheck: expect.any(Object),
            tCheck: expect.any(Object),
            lCheck: expect.any(Object),
            mailSent: expect.any(Object),
            shippingCost: expect.any(Object),
            currentBalance: expect.any(Object),
            date: expect.any(Object),
            ban: expect.any(Object),
            isPrinter: expect.any(Object),
          }),
        );
      });
    });

    describe('getUsers', () => {
      it('should return NewUsers for default Users initial value', () => {
        const formGroup = service.createUsersFormGroup(sampleWithNewData);

        const users = service.getUsers(formGroup) as any;

        expect(users).toMatchObject(sampleWithNewData);
      });

      it('should return NewUsers for empty Users initial value', () => {
        const formGroup = service.createUsersFormGroup();

        const users = service.getUsers(formGroup) as any;

        expect(users).toMatchObject({});
      });

      it('should return IUsers', () => {
        const formGroup = service.createUsersFormGroup(sampleWithRequiredData);

        const users = service.getUsers(formGroup) as any;

        expect(users).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUsers should not enable id FormControl', () => {
        const formGroup = service.createUsersFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUsers should disable id FormControl', () => {
        const formGroup = service.createUsersFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

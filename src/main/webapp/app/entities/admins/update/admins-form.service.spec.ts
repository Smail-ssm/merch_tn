import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../admins.test-samples';

import { AdminsFormService } from './admins-form.service';

describe('Admins Form Service', () => {
  let service: AdminsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminsFormService);
  });

  describe('Service methods', () => {
    describe('createAdminsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAdminsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            email: expect.any(Object),
            phone: expect.any(Object),
            role: expect.any(Object),
            photo: expect.any(Object),
            password: expect.any(Object),
            status: expect.any(Object),
            rememberToken: expect.any(Object),
            createdat: expect.any(Object),
            updatedat: expect.any(Object),
            shopName: expect.any(Object),
          }),
        );
      });

      it('passing IAdmins should create a new form with FormGroup', () => {
        const formGroup = service.createAdminsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            email: expect.any(Object),
            phone: expect.any(Object),
            role: expect.any(Object),
            photo: expect.any(Object),
            password: expect.any(Object),
            status: expect.any(Object),
            rememberToken: expect.any(Object),
            createdat: expect.any(Object),
            updatedat: expect.any(Object),
            shopName: expect.any(Object),
          }),
        );
      });
    });

    describe('getAdmins', () => {
      it('should return NewAdmins for default Admins initial value', () => {
        const formGroup = service.createAdminsFormGroup(sampleWithNewData);

        const admins = service.getAdmins(formGroup) as any;

        expect(admins).toMatchObject(sampleWithNewData);
      });

      it('should return NewAdmins for empty Admins initial value', () => {
        const formGroup = service.createAdminsFormGroup();

        const admins = service.getAdmins(formGroup) as any;

        expect(admins).toMatchObject({});
      });

      it('should return IAdmins', () => {
        const formGroup = service.createAdminsFormGroup(sampleWithRequiredData);

        const admins = service.getAdmins(formGroup) as any;

        expect(admins).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAdmins should not enable id FormControl', () => {
        const formGroup = service.createAdminsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAdmins should disable id FormControl', () => {
        const formGroup = service.createAdminsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AdminsService } from '../service/admins.service';
import { IAdmins } from '../admins.model';
import { AdminsFormService } from './admins-form.service';

import { AdminsUpdateComponent } from './admins-update.component';

describe('Admins Management Update Component', () => {
  let comp: AdminsUpdateComponent;
  let fixture: ComponentFixture<AdminsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let adminsFormService: AdminsFormService;
  let adminsService: AdminsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), AdminsUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(AdminsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AdminsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    adminsFormService = TestBed.inject(AdminsFormService);
    adminsService = TestBed.inject(AdminsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const admins: IAdmins = { id: 456 };

      activatedRoute.data = of({ admins });
      comp.ngOnInit();

      expect(comp.admins).toEqual(admins);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdmins>>();
      const admins = { id: 123 };
      jest.spyOn(adminsFormService, 'getAdmins').mockReturnValue(admins);
      jest.spyOn(adminsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ admins });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: admins }));
      saveSubject.complete();

      // THEN
      expect(adminsFormService.getAdmins).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(adminsService.update).toHaveBeenCalledWith(expect.objectContaining(admins));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdmins>>();
      const admins = { id: 123 };
      jest.spyOn(adminsFormService, 'getAdmins').mockReturnValue({ id: null });
      jest.spyOn(adminsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ admins: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: admins }));
      saveSubject.complete();

      // THEN
      expect(adminsFormService.getAdmins).toHaveBeenCalled();
      expect(adminsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAdmins>>();
      const admins = { id: 123 };
      jest.spyOn(adminsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ admins });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(adminsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VendorOrdersService } from '../service/vendor-orders.service';
import { IVendorOrders } from '../vendor-orders.model';
import { VendorOrdersFormService } from './vendor-orders-form.service';

import { VendorOrdersUpdateComponent } from './vendor-orders-update.component';

describe('VendorOrders Management Update Component', () => {
  let comp: VendorOrdersUpdateComponent;
  let fixture: ComponentFixture<VendorOrdersUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let vendorOrdersFormService: VendorOrdersFormService;
  let vendorOrdersService: VendorOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), VendorOrdersUpdateComponent],
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
      .overrideTemplate(VendorOrdersUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VendorOrdersUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    vendorOrdersFormService = TestBed.inject(VendorOrdersFormService);
    vendorOrdersService = TestBed.inject(VendorOrdersService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const vendorOrders: IVendorOrders = { id: 456 };

      activatedRoute.data = of({ vendorOrders });
      comp.ngOnInit();

      expect(comp.vendorOrders).toEqual(vendorOrders);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVendorOrders>>();
      const vendorOrders = { id: 123 };
      jest.spyOn(vendorOrdersFormService, 'getVendorOrders').mockReturnValue(vendorOrders);
      jest.spyOn(vendorOrdersService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vendorOrders });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vendorOrders }));
      saveSubject.complete();

      // THEN
      expect(vendorOrdersFormService.getVendorOrders).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(vendorOrdersService.update).toHaveBeenCalledWith(expect.objectContaining(vendorOrders));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVendorOrders>>();
      const vendorOrders = { id: 123 };
      jest.spyOn(vendorOrdersFormService, 'getVendorOrders').mockReturnValue({ id: null });
      jest.spyOn(vendorOrdersService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vendorOrders: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vendorOrders }));
      saveSubject.complete();

      // THEN
      expect(vendorOrdersFormService.getVendorOrders).toHaveBeenCalled();
      expect(vendorOrdersService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IVendorOrders>>();
      const vendorOrders = { id: 123 };
      jest.spyOn(vendorOrdersService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vendorOrders });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(vendorOrdersService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

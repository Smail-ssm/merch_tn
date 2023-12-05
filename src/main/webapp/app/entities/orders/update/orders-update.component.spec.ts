import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OrdersService } from '../service/orders.service';
import { IOrders } from '../orders.model';
import { OrdersFormService } from './orders-form.service';

import { OrdersUpdateComponent } from './orders-update.component';

describe('Orders Management Update Component', () => {
  let comp: OrdersUpdateComponent;
  let fixture: ComponentFixture<OrdersUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ordersFormService: OrdersFormService;
  let ordersService: OrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), OrdersUpdateComponent],
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
      .overrideTemplate(OrdersUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OrdersUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ordersFormService = TestBed.inject(OrdersFormService);
    ordersService = TestBed.inject(OrdersService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const orders: IOrders = { id: 456 };

      activatedRoute.data = of({ orders });
      comp.ngOnInit();

      expect(comp.orders).toEqual(orders);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOrders>>();
      const orders = { id: 123 };
      jest.spyOn(ordersFormService, 'getOrders').mockReturnValue(orders);
      jest.spyOn(ordersService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ orders });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: orders }));
      saveSubject.complete();

      // THEN
      expect(ordersFormService.getOrders).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ordersService.update).toHaveBeenCalledWith(expect.objectContaining(orders));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOrders>>();
      const orders = { id: 123 };
      jest.spyOn(ordersFormService, 'getOrders').mockReturnValue({ id: null });
      jest.spyOn(ordersService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ orders: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: orders }));
      saveSubject.complete();

      // THEN
      expect(ordersFormService.getOrders).toHaveBeenCalled();
      expect(ordersService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOrders>>();
      const orders = { id: 123 };
      jest.spyOn(ordersService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ orders });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ordersService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

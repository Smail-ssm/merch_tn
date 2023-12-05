jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { VendorOrdersService } from '../service/vendor-orders.service';

import { VendorOrdersDeleteDialogComponent } from './vendor-orders-delete-dialog.component';

describe('VendorOrders Management Delete Component', () => {
  let comp: VendorOrdersDeleteDialogComponent;
  let fixture: ComponentFixture<VendorOrdersDeleteDialogComponent>;
  let service: VendorOrdersService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, VendorOrdersDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(VendorOrdersDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VendorOrdersDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VendorOrdersService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});

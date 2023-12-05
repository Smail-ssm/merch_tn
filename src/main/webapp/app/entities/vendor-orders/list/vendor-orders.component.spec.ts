import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VendorOrdersService } from '../service/vendor-orders.service';

import { VendorOrdersComponent } from './vendor-orders.component';

describe('VendorOrders Management Component', () => {
  let comp: VendorOrdersComponent;
  let fixture: ComponentFixture<VendorOrdersComponent>;
  let service: VendorOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'vendor-orders', component: VendorOrdersComponent }]),
        HttpClientTestingModule,
        VendorOrdersComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(VendorOrdersComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VendorOrdersComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VendorOrdersService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.vendorOrders?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to vendorOrdersService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getVendorOrdersIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getVendorOrdersIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});

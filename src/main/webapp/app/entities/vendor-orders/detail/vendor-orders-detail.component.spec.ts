import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VendorOrdersDetailComponent } from './vendor-orders-detail.component';

describe('VendorOrders Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorOrdersDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: VendorOrdersDetailComponent,
              resolve: { vendorOrders: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(VendorOrdersDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load vendorOrders on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', VendorOrdersDetailComponent);

      // THEN
      expect(instance.vendorOrders).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});

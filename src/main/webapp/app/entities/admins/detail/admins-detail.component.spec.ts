import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AdminsDetailComponent } from './admins-detail.component';

describe('Admins Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminsDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: AdminsDetailComponent,
              resolve: { admins: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(AdminsDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load admins on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', AdminsDetailComponent);

      // THEN
      expect(instance.admins).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});

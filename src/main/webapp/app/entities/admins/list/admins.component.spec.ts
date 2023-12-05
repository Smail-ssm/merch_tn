import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AdminsService } from '../service/admins.service';

import { AdminsComponent } from './admins.component';

describe('Admins Management Component', () => {
  let comp: AdminsComponent;
  let fixture: ComponentFixture<AdminsComponent>;
  let service: AdminsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'admins', component: AdminsComponent }]), HttpClientTestingModule, AdminsComponent],
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
      .overrideTemplate(AdminsComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AdminsComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AdminsService);

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
    expect(comp.admins?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to adminsService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAdminsIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAdminsIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});

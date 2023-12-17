import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MloginComponent } from './mlogin.component';

describe('MloginComponent', () => {
  let component: MloginComponent;
  let fixture: ComponentFixture<MloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MloginComponent],
    });
    fixture = TestBed.createComponent(MloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

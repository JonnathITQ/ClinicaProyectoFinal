import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorLogin } from './doctor-login';

describe('DoctorLogin', () => {
  let component: DoctorLogin;
  let fixture: ComponentFixture<DoctorLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

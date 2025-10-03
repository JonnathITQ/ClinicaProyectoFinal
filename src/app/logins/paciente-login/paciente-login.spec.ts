import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteLogin } from './paciente-login';

describe('PacienteLogin', () => {
  let component: PacienteLogin;
  let fixture: ComponentFixture<PacienteLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacienteLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacionPaciente } from './recuperacion-paciente';

describe('RecuperacionPaciente', () => {
  let component: RecuperacionPaciente;
  let fixture: ComponentFixture<RecuperacionPaciente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperacionPaciente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperacionPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacionDoctor } from './recuperacion-doctor';

describe('RecuperacionDoctor', () => {
  let component: RecuperacionDoctor;
  let fixture: ComponentFixture<RecuperacionDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperacionDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperacionDoctor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

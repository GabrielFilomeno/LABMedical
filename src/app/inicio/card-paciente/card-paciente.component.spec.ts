import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPacienteComponent } from './card-paciente.component';

describe('CardPacienteComponent', () => {
  let component: CardPacienteComponent;
  let fixture: ComponentFixture<CardPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

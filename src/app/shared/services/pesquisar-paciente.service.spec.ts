import { TestBed } from '@angular/core/testing';

import { PesquisarPacienteService } from './pesquisar-paciente.service';

describe('PesquisarPacienteService', () => {
  let service: PesquisarPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesquisarPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

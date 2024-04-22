import { TestBed } from '@angular/core/testing';

import { VerificarLogadoService } from './verificar-logado.service';

describe('VerificarLogadoService', () => {
  let service: VerificarLogadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificarLogadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

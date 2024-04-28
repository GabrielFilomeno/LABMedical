import { TestBed } from '@angular/core/testing';

import { EventoEditarService } from './evento-editar.service';

describe('EventoEditarService', () => {
  let service: EventoEditarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoEditarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

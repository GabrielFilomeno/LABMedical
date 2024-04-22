import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { paginaLoginGuard } from './pagina-login.guard';

describe('paginaLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => paginaLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

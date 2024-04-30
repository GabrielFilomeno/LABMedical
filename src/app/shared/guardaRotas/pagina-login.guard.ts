import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VerificarLogadoService } from '../services/verificar-logado.service';
import { inject } from '@angular/core';

export const paginaLoginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const verificarLogadoService = inject ( VerificarLogadoService );
  const router = inject (Router)

  if (verificarLogadoService.usuarioLogado()) {
    router.navigate(['inicio']);
    return false;
  }
    return true;
};

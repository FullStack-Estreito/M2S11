import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const privadoGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).verificarUsuarioLogado())
    return true;
  else
    return inject(Router).createUrlTree(['/nao-autenticado']);
};

export const publicoGuard: CanActivateFn = (route, state) => {
  if (!inject(AuthService).verificarUsuarioLogado())
    return true;
  else
    return inject(Router).createUrlTree(['/inicio']);
};
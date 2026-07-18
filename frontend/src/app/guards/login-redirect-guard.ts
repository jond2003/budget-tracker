import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AppRoutes } from '../constants/routes';
import { LoginService } from '../services/login/login-service';

export const loginRedirectGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.checkLoggedIn().pipe(
    map((auth) => {
      if (!auth.authenticated) return true;
      return router.createUrlTree(['/'+AppRoutes.CALENDAR]);
    }),
    catchError(() => of(true))
  );
};

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AppRoutes } from '../constants/routes';
import { API } from '../constants/api.constants';

export const loginRedirectGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get<{ authenticated: boolean }>(
    API.AUTH_USER,
    {
      withCredentials: true
    }
  ).pipe(
    map(() => router.createUrlTree(['/'+AppRoutes.TRANSACTIONS])),
    catchError(() => of(true))
  );
};

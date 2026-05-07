import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

export const loginRedirectGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get<{ authenticated: boolean }>(
    'http://localhost:3000/api/auth/me',
    {
      withCredentials: true
    }
  ).pipe(
    map(() => router.createUrlTree(['/cal'])),
    catchError(() => of(true))
  );
};

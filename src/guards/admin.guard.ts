import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../app/services/auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  if (authService.isAdmin()) {
    return true;
  }

  const currentUser = authService.currentUser();

  if (currentUser && currentUser.role !== 'ADMIN') {
    return router.createUrlTree(['/products']);
  }

  return authService.loadCurrentUser().pipe(
    map((user) => {
      if (user.role === 'ADMIN') {
        return true;
      }

      return router.createUrlTree(['/products']);
    }),
    catchError(() => {
      authService.logout();
      return of(router.createUrlTree(['/login']));
    })
  );
};
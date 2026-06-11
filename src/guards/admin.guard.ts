import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../../src/app/services/auth';

export const adminGuard: CanActivateFn = (): boolean | UrlTree | Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  const currentUser = authService.currentUser();

  if (currentUser) {
    return isAdminRole(currentUser.role)
      ? true
      : router.createUrlTree(['/products']);
  }

  return authService.loadCurrentUser().pipe(
    map((user) => {
      return isAdminRole(user.role)
        ? true
        : router.createUrlTree(['/products']);
    }),
    catchError((error) => {
      console.error('Admin guard error:', error);
      authService.logout();
      return of(router.createUrlTree(['/login']));
    })
  );
};

function isAdminRole(role: string | null | undefined): boolean {
  return role === 'ADMIN' || role === 'ROLE_ADMIN';
}
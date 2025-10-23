import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  // Must be logged in
  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }

  // Check roles if defined
  const requiredRoles = route.data?.['roles'] as string[] | undefined;
  if (requiredRoles && !auth.hasAnyRole(requiredRoles)) {
    return router.createUrlTree(['/forbidden']);
  }

  return true; // allow
};

import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../user/auth-service.service';

export const AuthGuestGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(AuthService);
  const router = inject(Router);

  if (userService.isLogged) {
    return true;
  }
  router.navigate(['/404']);
  return false;
};

import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../user/auth-service.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(AuthService);
  const router = inject(Router);

  if (userService.isLogged) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};

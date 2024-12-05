import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../user/auth-service.service';
import { ApiService } from '../api.service';

export const AuthPostGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(AuthService);
  const postService = inject(ApiService);
  const router = inject(Router);

  const postId = route.params['id'];
  const currUser = userService.user;

  if (!currUser) {
    router.navigate(['/404']);
    return false;
  }

  let canActivate = false;
  postService.getSingleProduct(postId).subscribe(
    (post) => {
      if (String(post.owner) === String(currUser._id)) {
        canActivate = true;
      } else {
        router.navigate(['/404']);
      }
    },
    (error) => {
      console.error('Error fetching post:', error);
      router.navigate(['/404']);
    }
  );

  return true;
};

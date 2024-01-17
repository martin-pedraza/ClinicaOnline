import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const { loggedUser } = authService;

  if (!loggedUser) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};

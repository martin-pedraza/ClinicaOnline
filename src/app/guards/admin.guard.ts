import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const { loggedUser } = authService;

  if (!loggedUser || loggedUser['profile'] != 'admin') {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};

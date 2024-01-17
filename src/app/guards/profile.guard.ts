import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const profileGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const { loggedUser } = authService;
  const { profile } = route.data;

  if (!loggedUser || loggedUser['profile'] != profile) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
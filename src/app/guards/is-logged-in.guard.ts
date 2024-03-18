import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('customer') || localStorage.getItem('admin')) {
    return true;
  }
  inject(Router).navigateByUrl('/login');
  return false;
};

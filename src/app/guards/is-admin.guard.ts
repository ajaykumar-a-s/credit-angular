import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isAdminGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('admin')) {
    return true;
  }
  inject(Router).navigateByUrl('/login');
  return false;
};

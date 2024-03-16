import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isCustomerGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('customer')) {
    return true;
  }
  inject(Router).navigateByUrl("/login");
  return false
};

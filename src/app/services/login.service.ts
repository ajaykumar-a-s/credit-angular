import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  customerLogin(loginDetails: { email: string; password: string }) {
    return this.http
      .post('http://localhost:8080/customer-login', loginDetails)
      .pipe(catchError(this.handleError));
  }
  adminLogin(loginDetails: { email: string; password: string }) {
    return this.http
      .post('http://localhost:8080/admin-login', loginDetails)
      .pipe(catchError(this.handleError));
  }
  handleError(httpError: HttpErrorResponse): Observable<never> {
    let errorMessage: string = '';
    if (httpError.error instanceof ErrorEvent) {
      errorMessage = `Error: ${httpError.error.message}`;
    } else {
      errorMessage = `Error Code: ${httpError.status}\nMessage: ${httpError.error}`;
    }
    return throwError(errorMessage);
  }
  isCustomerLoggedIn() {
    return localStorage.getItem('customer') ? true : false;
  }
  isAdminLoggedIn() {
    return localStorage.getItem('admin') ? true : false;
  }
  isLoggedIn(): boolean {
    return this.isCustomerLoggedIn() || this.isAdminLoggedIn();
  }
  getCustomer() {
    if (this.isCustomerLoggedIn()) {
      return JSON.parse(localStorage.getItem('customer') || '{}');
    }
  }
  getAdmin() {
    if (this.isAdminLoggedIn()) {
      return JSON.parse(localStorage.getItem('admin') || '{}');
    }
  }
  logout() {
    localStorage.removeItem('customer');
    localStorage.removeItem('admin');
  }
}

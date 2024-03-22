import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  currentCustomer : any;

  constructor(private http : HttpClient) { }
  addCustomer(customer: any){
    return this.http.post('http://localhost:8080/customer', customer).pipe(catchError(this.handleError));
  }
  getCustomerById(customerId: number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/customer/' + customerId).pipe(catchError(this.handleError));
  }
  getAllCustomers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/customers').pipe(catchError(this.handleError));
  }
  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/customer/' + customerId).pipe(catchError(this.handleError));
  }
  updateCustomer(customer: any): Observable<any> {
    return this.http.put<any>('http://localhost:8080/customer', customer).pipe(catchError(this.handleError));
  
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
  public setCurrentCustomer(customer: any){
    this.currentCustomer = customer;
  }
  public getCurrentCustomer(){
    return this.currentCustomer;
  }
}

import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{BillResponse} from '../model/bill';
import { Observable,catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http:HttpClient) { }
getBill(
  creditCardNumber : string
):Observable<BillResponse>{
  return this.http
  .get<BillResponse>(
    'http://localhost:8080/getBill/' + creditCardNumber
  )
  .pipe(catchError(this.handleError));
}
payBill(
  creditCardNumber : string
):Observable<any>{
  return this.http
  .get<any>(
    'http://localhost:8080/billPayment/' + creditCardNumber,
    
  )
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

}

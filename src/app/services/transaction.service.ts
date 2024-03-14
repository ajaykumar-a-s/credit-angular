import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionRequest } from '../model/transaction-request';
import { Observable, catchError, throwError } from 'rxjs';
import { TransactionResponse } from '../model/transaction-response';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) { }
  transferAmount(transactionRequest: TransactionRequest): Observable<TransactionResponse>{
    return this.http.post<TransactionResponse>('http://localhost:8080/transfer-amount', transactionRequest).pipe(
      catchError(this.handleError)
    );
  }
  handleError(httpError: HttpErrorResponse) :Observable<never>{
    let errorMessage: string = '';
    if (httpError.error instanceof ErrorEvent) {
      errorMessage = `Error: ${httpError.error.message}`;
    } else {
      errorMessage = `Error Code: ${httpError.status}\nMessage: ${httpError.error}`;
    }
    return throwError(errorMessage);
  }
}

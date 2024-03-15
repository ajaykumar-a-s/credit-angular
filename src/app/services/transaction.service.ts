import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionRequest } from '../model/transaction-request';
import { Observable, catchError, throwError } from 'rxjs';
import { TransactionResponse } from '../model/transaction-response';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}
  transferAmount(
    transactionRequest: TransactionRequest
  ): Observable<TransactionResponse> {
    return this.http
      .post<TransactionResponse>(
        'http://localhost:8080/transfer-amount',
        transactionRequest
      )
      .pipe(catchError(this.handleError));
  }
  getTransactionById(transactionId: number): Observable<TransactionResponse> {
    return this.http
      .get<TransactionResponse>(
        'http://localhost:8080/transaction/' + transactionId
      )
      .pipe(catchError(this.handleError));
  }
  getAllTransactions(): Observable<TransactionResponse[]> {
    return this.http
      .get<TransactionResponse[]>('http://localhost:8080/transactions')
      .pipe(catchError(this.handleError));
  }
  getTransactionsByCustomerCreditCardNumber(
    customerCreditCardNumber: string
  ): Observable<TransactionResponse[]> {
    return this.http
      .get<TransactionResponse[]>(
        'http://localhost:8080/transactions/' + customerCreditCardNumber
      )
      .pipe(catchError(this.handleError));
  }
  getTransactionsByCustomerCreditCardNumberForParticularDuration(
    customerCreditCardNumber: string,
    startDate: Date,
    endDate: Date
  ): Observable<TransactionResponse[]> {
    return this.http
      .get<TransactionResponse[]>(
        'http://localhost:8080/transactions/' +
          customerCreditCardNumber +
          '/' +
          startDate +
          '/' +
          endDate
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

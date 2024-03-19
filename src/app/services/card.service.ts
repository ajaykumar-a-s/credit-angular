import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CardService {
  


constructor(private http: HttpClient) {}
requestCard(customerId:number): Observable<any> {
  
  return this.http
    .get<any>(
      'http://localhost:8080/request/'+customerId, 
    )
    .pipe(catchError(this.handleError));
}
getRequestedCardList(): Observable<any> {
  return this.http
    .get<any>('http://localhost:8080/requestlist')
    .pipe(catchError(this.handleError));
}
validate(requestId:number): Observable<any> {
 
  return this.http
    .get<any>('http://localhost:8080/validate/'+requestId)
    .pipe(catchError(this.handleError));
}
cardList():Observable<any>
{
  return this.http
  .get<any>('http://localhost:8080/cardlist')
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



import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError ,throwError} from 'rxjs';
import { Merchant } from '../model/merchant';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http:HttpClient) { 
    
  }

  addMerchant(merchant:Merchant):Observable<any>{
    return this.http.post("http://localhost:8080/merchant",merchant)
    .pipe(catchError(this.handleError));
  }

 deleteMerchant(id:number):Observable<any>{
  return this.http.delete("http://localhost:8080/merchant/"+id)
  .pipe(catchError(this.handleError));;
 }

 getAllMerchants():Observable<any>{
  return this.http.get("http://localhost:8080/merchants")
  .pipe(catchError(this.handleError));;
 }
 updateMerchant(merchant:Merchant):Observable<any>{
  return this.http.get("http://localhost:8080/merchant/")
  .pipe(catchError(this.handleError));;
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

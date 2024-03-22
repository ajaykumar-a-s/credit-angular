import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError ,throwError} from 'rxjs';
import { Merchant } from '../model/merchant';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  currentMerchant !: Merchant;

  constructor(private http:HttpClient) { 
    
  }

  addMerchant(merchant:Merchant):Observable<any>{
    return this.http.post("http://localhost:8080/merchant",merchant)
    .pipe(catchError(this.handleError));
  }

 deleteMerchant(id:number| undefined):Observable<any>{
  return this.http.delete("http://localhost:8080/merchant/"+id)
  .pipe(catchError(this.handleError));;
 }

 getAllMerchants():Observable<any>{
  return this.http.get("http://localhost:8080/merchants")
  .pipe(catchError(this.handleError));;
 }
 updateMerchant(merchant:Merchant):Observable<any>{
  return this.http.put("http://localhost:8080/merchant",merchant)
  .pipe(catchError(this.handleError));;
 }
  public  setMerchant(merchant:Merchant):void{
    this.currentMerchant=merchant;
  }
  public getMerchant():Merchant{
    return this.currentMerchant;
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

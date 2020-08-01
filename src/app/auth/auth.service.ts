import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError} from 'rxjs/operators'
import {throwError} from 'rxjs'
export interface AuthResponse{
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signUp(email,password)
  {
    const data={email,password,returnSecureToken:true}
   return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrkErbnF5W5Q6bjg3IaKnph6hefBgL8rc',
    data).pipe(
      catchError(error => {
        let errorName="";
        if(  error.error  && error.error.error && error.error.error.message && error.error.error.message == 'EMAIL_EXISTS'){
          errorName="Email already registered";
          return throwError(errorName);
          }
          else{
            errorName="Something went wrong."
            return throwError(errorName);
          }
       
      })
    )
    ;
  }

}

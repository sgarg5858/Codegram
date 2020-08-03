import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {catchError,tap} from 'rxjs/operators'
import {throwError, Subject, BehaviorSubject} from 'rxjs'
import {User} from './user.model'
import { Router } from '@angular/router';

export interface AuthResponse{
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  autoLogoutTimer:any;
  userDataChanged = new BehaviorSubject<User>(null);
  userToken=null;
 
  getUserToken()
  {
    return this.userToken;
  }

  constructor(private http:HttpClient,private router:Router) { }

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
      }
      )
    )
    ;
  }
  login(email,password)
  {
    const data={email,password,returnSecureToken:true};
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrkErbnF5W5Q6bjg3IaKnph6hefBgL8rc'
    ,data).pipe(
      catchError(error=>{
        let errorName=""
        if(error.error && error.error.error && error.error.error.message && error.error.error.message == 'INVALID_PASSWORD')
        {
          errorName='Wrong Password.';
          return throwError(errorName);
        }else if(error.error && error.error.error && error.error.error.message && error.error.error.message == 'EMAIL_NOT_FOUND')
        {
          errorName='Email not registered.';
          return throwError(errorName);
        }
        else{
          errorName='Something went wrong.';
          return throwError(errorName);
        }
      })
    )
  }
  

  logout()
  {
    if(this.autoLogoutTimer)
    {
      clearTimeout(this.autoLogoutTimer);
    }
    this.userToken=null;
    this.userDataChanged.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  autoLogin()
  {
    const userData:{
      email:string,
      id:string,
      _token:string,
      _tokenExpirationDate:string
    }
    =JSON.parse(localStorage.getItem('userData'));
    if(!userData)
    {
      return;
    }
    const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

    if(loadedUser.token)
    {
      this.userToken=loadedUser.token;
      this.userDataChanged.next(loadedUser);
      this.router.navigate(['/profile']);
      const timeLeft=new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(timeLeft);
    }
  }

  autoLogout(expirationDuration:number)
  {
    console.log(expirationDuration);
   this.autoLogoutTimer = setTimeout(()=>{
     this.logout(); 
    },expirationDuration)
  }

  sendEmailRequest(email)
  {
    const data={email,requestType:'PASSWORD_RESET'};
   return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDrkErbnF5W5Q6bjg3IaKnph6hefBgL8rc',data);
  }

}

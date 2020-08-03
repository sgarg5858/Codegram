import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm:FormGroup;
  isLoading=false;
  isError=false;
  errorName="";
  isUserAuthenticated=false;
  userInfoSubscription:Subscription;
  loginSubscription:Subscription
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])
    })
    this.userInfoSubscription=this.authService.userDataChanged.subscribe((user)=>{
      this.isUserAuthenticated = user !=null;
      if(this.isUserAuthenticated)
      {
        this.router.navigate(['profile']);
      }
    })
  }
  onLogin()
  {
    this.isLoading=true;
    this.isError=false;
    const email=this.loginForm.value.email;
    const password=this.loginForm.value.password;
    
    this.loginSubscription = this.authService.login(email,password).subscribe((response)=>{

      this.isLoading=false;
      
      const expirationDate=new Date(new Date().getTime()+ (+response.expiresIn*1000));
      const user= new User(response.email,response.localId,response.idToken,expirationDate);
      
      this.authService.userToken=response.idToken;
      this.authService.userDataChanged.next(user);

      //for auto logout
      this.authService.autoLogout(+response.expiresIn*1000);
      
      //for auto login so that when we reload the browser or page we can fetch
      localStorage.setItem('userData',JSON.stringify(user));

      this.router.navigate(['/profile'])
      
    },(error)=>{
      console.log(error);
      this.isLoading=false;
      this.isError=true;
      this.errorName=error;
    })

  }
  ngOnDestroy()
  {
    if(this.loginSubscription)
    {
      this.loginSubscription.unsubscribe();
    }
    if(this.userInfoSubscription)
    {
      this.userInfoSubscription.unsubscribe();
    }
  }
  

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import {AuthService} from '../auth.service';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit,OnDestroy {

  signupForm:FormGroup;
  isLoading=false;
  isError=false;
  errorName="";
  signupSubscription:Subscription;
  isUserAuthenticated=false;
  userInfoSubscription:Subscription;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.signupForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
    })
    this.userInfoSubscription=this.authService.userDataChanged.subscribe((user)=>{
      this.isUserAuthenticated = user !=null;
      if(this.isUserAuthenticated)
      {
        this.router.navigate(['profile']);
      }
    })
  }
  onSignUp()
  {
    this.isLoading=true;
    this.isError=false;
    console.log(this.signupForm.value);
    const email=this.signupForm.value.email;
    const password=this.signupForm.value.password;
   
    //  this.signupForm.reset();
   this.signupSubscription= this.authService.signUp(email,password).subscribe((response)=>{
      
      this.isLoading=false;

      const expirationDate=new Date(new Date().getTime()+ (+response.expiresIn*1000));
      const user= new User(response.email,response.localId,response.idToken,expirationDate);
      
      this.authService.userToken=response.idToken;
      this.authService.userDataChanged.next(user);
      this.authService.autoLogout(+response.expiresIn*1000);

      //for auto login so that when we reload the browser or page we can fetch
      localStorage.setItem('userData',JSON.stringify(user));

      this.router.navigate(['/profile']);


    },(error)=>{
      this.isLoading=false;
      this.isError=true;
     this.errorName=error;
    })
  }
  ngOnDestroy()
  {
    if(this.signupSubscription)
    {
      this.signupSubscription.unsubscribe();
    }
    if(this.userInfoSubscription)
    {
      this.userInfoSubscription.unsubscribe();
    }
  }
  
}

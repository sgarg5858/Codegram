import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import {AuthService} from '../auth.service';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
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
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.signupForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
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
      
      this.authService.userDataChanged.next(user);

    },(error)=>{
      this.isLoading=false;
      this.isError=true;
     this.errorName=error;
    })
  }
  ngOnDestroy()
  {
    this.signupSubscription.unsubscribe();
  }
  
}
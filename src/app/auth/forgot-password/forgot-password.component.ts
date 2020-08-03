import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit,OnDestroy {

  constructor(private authService:AuthService,private router:Router) { }
  resetForm:FormGroup;
  isLoading=false;
  isError=false;
  errorName="";
  linkSent=false;
  isUserAuthenticated=false;
  userInfoSubscription:Subscription;

  ngOnInit(): void {
    this.resetForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email])
    })
    this.userInfoSubscription=this.authService.userDataChanged.subscribe((user)=>{
      this.isUserAuthenticated = user !=null;
      if(this.isUserAuthenticated)
      {
        this.router.navigate(['profile']);
      }
    })
  }
  sendEmailRequest()
  {
    this.linkSent=false;
    this.isError=false;
    this.isLoading=true;
    console.log(this.resetForm.value);
    this.authService.sendEmailRequest(this.resetForm.value.email).subscribe((response)=>{
      this.isLoading=false;
      this.linkSent=true;
    
      console.log(response)
    },(error)=>{
      this.isLoading=false;
      this.isError=true;
      if(error.error && error.error.error && error.error.error.message && error.error.error.message=="EMAIL_NOT_FOUND")
      {
        this.errorName="No account found with this email"
      }
      else{
        this.errorName="Something went wrong";
      }
      console.log(error);
    })
  }
  ngOnDestroy()
  {
    if(this.userInfoSubscription)
    {
      this.userInfoSubscription.unsubscribe();
    }
  }

}

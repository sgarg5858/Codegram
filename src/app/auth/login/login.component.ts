import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

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
  loginSubscription:Subscription
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])
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
      console.log(response);
    },(error)=>{
      console.log(error);
      this.isLoading=false;
      this.isError=true;
      this.errorName=error;
    })

  }
  ngOnDestroy()
  {
    this.loginSubscription.unsubscribe();
  }
  

}

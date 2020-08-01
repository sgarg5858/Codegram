import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm:FormGroup;
  isLoading=false;
  isError=false;
  errorName="";
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
    this.authService.signUp(email,password).subscribe((response)=>{
      console.log(response);
      this.isLoading=false;
    },(error)=>{
      this.isLoading=false;
      this.isError=true;
     this.errorName=error;
    })
  }
  
}

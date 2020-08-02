import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService:AuthService) { }
  resetForm:FormGroup;
  isLoading=false;
  isError=false;
  errorName="";

  ngOnInit(): void {
    this.resetForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email])
    })
  }
  sendEmailRequest()
  {
    this.isError=false;
    this.isLoading=true;
    console.log(this.resetForm.value);
    this.authService.sendEmailRequest(this.resetForm.value.email).subscribe((response)=>{
      this.isLoading=false;
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

}

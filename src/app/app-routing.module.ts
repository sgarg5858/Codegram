import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {AuthGuardService} from './auth/auth.guard'
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const routes: Routes = [
  {path:'login',component:LoginComponent,pathMatch:'full'},
  {path:'signup',component:SignUpComponent,pathMatch:'full'},
  {path:'reset-password',component:ForgotPasswordComponent,pathMatch:'full'},
  {path:'profile',component:ProfileInfoComponent,pathMatch:'full',canActivate:[AuthGuardService]},
  {path:'**',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
